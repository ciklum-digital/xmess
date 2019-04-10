module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "browsers": [
            "last 2 versions",
            "safari >= 7"
          ]
        },
        "exclude": [
          "babel-plugin-transform-async-to-generator"
        ]
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "async-to-promises",
    [
      "module-resolver",
      {
        "root": [
          "./src"
        ]
      }
    ]
  ]
};
