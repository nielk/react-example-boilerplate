// @flow

import type { Language } from 'models/language'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import { Map } from 'immutable'

// For browser doesn't support Intl (i.e. Safari)
import 'intl'
import 'intl/locale-data/jsonp/en'
import 'intl/locale-data/jsonp/fr'

// $FlowIgnoreNextLine
const messagesFr = (__PROD__) ? require('./../../dist/i18n/fr.json') : require('./fr') // generated by the BuildLangsWebpackPlugin

export default function loadMessages(languageCode: string): Promise<Language> {
  switch (languageCode) {
    case 'en':
      addLocaleData(...en)
      // no message here because it use the default messages (defined in the react components)
      return Promise.resolve({ languageCode, messages: Map() })
    case 'fr':
      addLocaleData(...fr)
      return Promise.resolve({ languageCode, messages: messagesFr })
    default:
      return Promise.reject()
  }
}