import * as fs from 'fs'
import { sync as globSync } from 'glob'
import { sync as mkdirpSync } from 'mkdirp'

const outputLangsDataDir = './dist/i18n/'
const langsPath = {
  fr: './src/i18n/fr/',
  en: './build/messages/'
}

function addMessageInCollection(id, message, collection) {
  const res = collection
  if (Object.prototype.hasOwnProperty.call(collection, id)) {
    throw new Error(`Duplicate message id: ${id}`)
  }

  res[id] = message

  return res
}

// Aggregates the default messages that were extracted from the app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
function getJsonMessages(path) {
  const filePattern = `${path}**/*.json`
  const messages = globSync(filePattern)
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
  const sortedMessages = Object.keys(messages).sort().reduce((res, key) => (res[key] = messages[key], res), {}) // eslint-disable-line

  return JSON.stringify(sortedMessages, null, 2)
}

mkdirpSync(outputLangsDataDir)

Object.entries(langsPath).forEach((entry) => {
  const lang = entry[0]
  const path = entry[1]

  fs.writeFileSync(`${outputLangsDataDir}${lang}.json`, getJsonMessages(path))
})
