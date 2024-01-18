module.exports = {
  inputSourceMap: true,
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: 'current' } }],
  ],
};
