const fs = require('fs')
const glob = require('glob')
const mkdirp = require('mkdirp')
const entries = require('object.entries')

// Polyfill, currently in draft
if (!Object.entries) {
  entries.shim()
}

function addMessageInCollection(id, message, collection) {
  const res = collection
  if (Object.prototype.hasOwnProperty.call(collection, id)) {
    throw new Error(`BuildLangs: Duplicate message id: ${id}`)
  }

  res[id] = message

  return res
}

// Aggregates the all json files. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
function getJsonMessages(path) {
  const filePattern = `${path}**/*.json`
  const messages = glob.sync(filePattern)
    .map(filename => fs.readFileSync(filename, 'utf8'))
    .map(file => JSON.parse(file))
    .reduce((collection, messages) => {
      const res = collection

      if (Array.isArray(messages)) { // from ./build/messages
        messages.forEach(({ id, defaultMessage }) => addMessageInCollection(id, defaultMessage, res))
      } else { // from ./src/i18n
        Object.entries(messages).forEach(entry => addMessageInCollection(entry[0], entry[1], res))
      }

      return res
    }, {})

  // Sort messages by its entry key
  const sortedMessages = Object.keys(messages).sort().reduce((res, key) => (res[key] = messages[key], res), {})

  return JSON.stringify(sortedMessages, null, 2)
}

function writeInFile(outputDir, filename, data) {
  fs.writeFileSync(outputDir + filename, data)
}

function apply(options, compiler) {
  compiler.plugin('compile', () => {
    mkdirp(options.outputDir, (err) => {
      if (err) throw new Error('BuildLangs: The output directory cannot be create')

      Object.entries(options.langsPath).forEach((entry) => {
        const lang = entry[0]
        const path = entry[1]

        console.log(`BuildLangs: make ${lang} lang`)

        writeInFile(options.outputDir, `${lang}.json`, getJsonMessages(path))

        console.log(`BuildLangs: make ${lang} lang done`)
      })
    })
  })

  // Make default lang on emit to be sure the babel-loader has finished
  compiler.plugin('emit', (compilation, callback) => {
    console.log('BuildLangs: make default lang')

    writeInFile(options.outputDir, 'default.json', getJsonMessages(options.defaultLangPath))

    console.log('BuildLangs: make default lang done')

    callback()
  })

  compiler.plugin('done', () => {
    console.log('BuildLangs: done!')
  })
}

function BuildLangsWebpackPlugin(options) {
  if (!options.langsPath) throw new Error('BuildLangs: None langs path are defined')
  if (!options.defaultLangPath) throw new Error('BuildLangs: The default lang path is not defined')
  if (!options.outputDir) throw new Error('BuildLangs: The output directory is not defined')

  this.options = options

  return {
    apply: apply.bind(this, options)
  }
}

module.exports = BuildLangsWebpackPlugin
