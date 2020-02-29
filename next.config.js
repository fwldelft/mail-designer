const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  webpack(config, { isServer, dev }) {
    if (!dev) {
      const prevOptions = config.optimization.minimizer[0].options
      config.optimization.minimizer[0] = new TerserPlugin({
        ...prevOptions,
        test: new RegExp(
          `^${path.basename(require.resolve("mjml/package.json"))}.+$`
        )
      })
    }

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
