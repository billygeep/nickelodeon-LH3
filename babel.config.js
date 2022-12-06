module.exports = {

        "plugins": ["@babel/plugin-transform-block-scoping", '@babel/plugin-syntax-dynamic-import'],
        "presets": [
            ["@babel/preset-env", {
                "corejs": "2.0.0",
                "useBuiltIns": "usage",
                "debug":true
            }]
      ]
};