module.exports = {
  env: {
    browser: true,
    jest: true
  },
  extends: [
    "airbnb",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/react"
  ],
  parser: "babel-eslint",
  rules: {
    "class-methods-use-this": 0,
    "import/no-named-as-default": 0,
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx"]
      }
    ],
    "jsx-a11y/label-has-for": [
      2,
      {
        components: ["Label"],
        required: {
          every: ["nesting", "id"]
        },
        allowChildren: true
      }
    ],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["CustomInputLabel"],
        labelAttributes: ["label"],
        controlComponents: ["CustomInput"],
        depth: 3
      }
    ]
  }
};
