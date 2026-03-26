// babel.config.js for backend to use ES6 modules
export default {
  presets: [["@babel/preset-env", { targets: { node: "current" } }]],
};