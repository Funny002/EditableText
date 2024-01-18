import { startCase } from 'lodash';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
//
import Core from '../package/core/package.json';

// import History from '../packages/history/package.json';

function configure(pkg, env, target) {
  const isProd = env === 'production';

  const isUmd = target === 'umd';
  const isCommonJs = target === 'cjs';
  // const isModule = target === 'module';

  const input = `package/${pkg.name}/src/index.ts`;
  const deps = []
    .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
    .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : []);

  // Stop Rollup from warning about circular dependencies.
  const onwarn = warning => {
    if (warning.code !== 'CIRCULAR_DEPENDENCY') {
      console.warn(`(!) ${warning.message}`); // eslint-disable-line no-console
    }
  };

  const plugins = [
    // @rollup/plugin-node-resolve
    resolve({ browser: true }),

    // rollup-plugin-typescript2
    typescript({
      clean: true,
      abortOnError: false,
      tsconfig: `./package/${pkg.name}/tsconfig.json`,
      tsconfigOverride: { compilerOptions: { module: 'ES2020' } },
    }),

    // @rollup/plugin-commonjs
    commonjs({
      exclude: [`package/${pkg.name}/src/**`],
    }),

    //
    babel({
      babelHelpers: 'runtime',
      include: [`package/${pkg.name}/src/**`],
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
    isUmd && isProd,
  ].filter(Boolean);

  if (isUmd) {
    return {
      plugins, input, onwarn, output: {
        format: 'umd',
        exports: 'named',
        globals: pkg.umdGlobals,
        file: `package/${pkg.name}/${isProd ? pkg.umdMin : pkg.umd}`,
        name: startCase(pkg.name).replace(/ /g, ''),
      },
      external: Object.keys(pkg.umdGlobals || {}),
    };
  }

  if (isCommonJs) {
    return {
      plugins, input, onwarn, output: [{
        file: `package/${pkg.name}/${pkg.main}`, format: 'cjs', exports: 'named', sourcemap: true,
      }],
      // We need to explicitly state which modules are external, meaning that
      // they are present at runtime. In the case of non-UMD configs, this means
      // all non-Slate packages.
      external: id => {
        return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`));
      },
    };
  }

  // if (isModule) {
  //   return {
  //     plugins, input, onwarn, output: [{
  //       file: `package/${pkg.name}/${pkg.module}`, format: 'es', sourcemap: true,
  //     }],
  //     // We need to explicitly state which modules are external, meaning that
  //     // they are present at runtime. In the case of non-UMD configs, this means
  //     // all non-Slate packages.
  //     external: id => {
  //       return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`));
  //     },
  //   };
  // }
}

function factory(pkg, options = {}) {
  const isProd = process.env.NODE_ENV === 'production';
  return [
    configure(pkg, 'development', 'cjs', options),
    configure(pkg, 'development', 'module', options),
    isProd && configure(pkg, 'production', 'umd', options),
    isProd && configure(pkg, 'development', 'umd', options),
  ].filter(Boolean);
}

export default [
  ...factory(Core),
  // ...factory(History),
];
