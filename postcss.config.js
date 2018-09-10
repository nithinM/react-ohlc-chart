module.exports = {
  plugins: [
    require("postcss-smart-import")({}),
    require("precss")({}),
    require("postcss-flexbugs-fixes"),
    require("autoprefixer")({}),
    require("postcss-flexibility")
  ]
};
