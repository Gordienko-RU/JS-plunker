const presets = [
  ['@babel/env', {
    targets: { node: 'current' },
  }]
];
const plugins = [
  ['@babel/plugin-proposal-decorators', {
    decoratorsBeforeExport: true,
  }]
];

// TODO: set-up correct babel transformation for trying new features
module.exports = { presets, plugins };