import { startCase } from 'lodash';
import sass from 'rollup-plugin-sass';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
//
const packagesName = 'packages';

function configure(pkg, env, target, options = {}) {
  const isProd = env === 'production';
  const name = pkg['pkgName'] || pkg.name;
  //
  const isUmd = target === 'umd';
  const isCommonJs = target === 'cjs';
  const isModule = target === 'module';

  const input = `${packagesName}/${name}/${pkg['input'] || 'src/index.ts'}`;
  const deps = []
    .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
    .concat(pkg['peerDependencies'] ? Object.keys(pkg['peerDependencies']) : []);
  // Stop Rollup from warning about circular dependencies.
  const onwarn = warning => {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.warn(`(!) ${warning.message}`); // eslint-disable-line no-console
    }
  };

  const plugins = [
    // rollup-plugin-sass
    sass({
      sourceMap: true,
      failOnError: true,
      output: `./${packagesName}/${name}/dist/style.css`,
      include: [`./${packagesName}/${name}/src/**/*.{css, scss, sass}`],
    }),

    // @rollup/plugin-node-resolve
    resolve({ browser: true }),

    // rollup-plugin-typescript2
    typescript({
      clean: true,
      abortOnError: false,
      tsconfig: `./${packagesName}/${name}/tsconfig.json`,
    }),

    // @rollup/plugin-commonjs
    commonjs({
      exclude: [`${packagesName}/${name}/src/**`],
    }),

    // @rollup/plugin-babel
    babel({
      babelHelpers: 'runtime',
      include: [`${packagesName}/${name}/src/**`],
      extensions: ['.js', '.ts', '.tsx'],
      presets: [
        '@babel/preset-typescript',
        ['@babel/preset-env', { modules: false }],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          isUmd ? {} : { regenerator: false, useESModules: false },
        ],
        '@babel/plugin-transform-class-properties',
      ],
    }),

    //
    isUmd && isProd && terser(),
  ].filter(Boolean);

  if (isUmd) {
    return {
      plugins,
      input,
      onwarn,
      output: {
        format: 'umd',
        exports: 'named',
        globals: pkg['umdGlobals'] || name,
        file: `${packagesName}/${name}/${isProd ? pkg['umdMin'] : pkg['umd']}`,
        name: startCase(name).replace(/ /g, ''),
      },
      external: Object.keys(pkg['umdGlobals'] || {}),
    };
  }

  if (isCommonJs) {
    return {
      plugins, input, onwarn, output: [{
        file: `${packagesName}/${name}/${pkg['main']}`, format: 'cjs', exports: 'named', sourcemap: true,
      }],
      // We need to explicitly state which modules are external, meaning that
      // they are present at runtime. In the case of non-UMD configs, this means
      // all non-Slate packages.
      external: id => {
        return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`));
      },
    };
  }

  if (isModule) {
    return {
      plugins, input, onwarn, output: [{
        file: `${packagesName}/${name}/${pkg.module || 'dist/index.module.js'}`, format: 'es', sourcemap: true,
      }],
      // We need to explicitly state which modules are external, meaning that
      // they are present at runtime. In the case of non-UMD configs, this means
      // all non-Slate packages.
      external: id => {
        return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`));
      },
    };
  }
}

function factory(pkg, options = {}) {
  const isProd = process.env.npm_config_node_env === 'production';
  return [
    configure(pkg, 'development', 'cjs', options),
    configure(pkg, 'development', 'module', options),
    isProd && configure(pkg, 'production', 'umd', options),
    isProd && configure(pkg, 'development', 'umd', options),
  ].filter(Boolean);
}

import Core from '../packages/core/package.json';
import Utils from '../packages/utils/package.json';
import Editor from '../packages/editor/package.json';
import History from '../packages/history/package.json';

export default [
  ...factory(Core),
  ...factory(Utils),
  ...factory(Editor),
  ...factory(History),
];
