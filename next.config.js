const path = require("path")

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      ;(config.resolve || (config.resolve = {})).alias ||
        (config.resolve.alias = {})

      config.resolve.alias.fs = path.resolve(__dirname, "src/mocks/fs.js")
      config.resolve.alias["uglify-js"] = path.resolve(
        __dirname,
        "src/mocks/uglify-js.js"
      )
    }

    return config
  }
}
