// @flow

import type { Map } from 'immutable'

export type Language = {
  languageCode: string,
  messages: Map<string, string>
}
