function buildConfig(env) {
  // eslint-disable-next-line
  return require(`./webpack/${env}.config.js`)({ env })
}

module.exports = buildConfig(process.env.NODE_ENV)
