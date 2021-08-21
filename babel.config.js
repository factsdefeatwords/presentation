module.exports = {
  presets: [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 2 versions"] // 最近 2 个版本的浏览器
      }
    }]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        // "absoluteRuntime": false,
        "corejs": false,
        // "helpers": true,
        "regenerator": true,
        // "useESModules": false
      }
    ]
  ]
}