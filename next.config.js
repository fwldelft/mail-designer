module.exports = {
  webpack(config) {
    ;(config.resolve || (config.resolve = {})).alias ||
      (config.resolve.alias = {})
    config.resolve.alias.mjml = "mjml4-in-browser"

    return config
  }
}
