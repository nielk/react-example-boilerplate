// @flow

import type { AppContainerStateShape, AppContainerStateRecord } from 'containers/AppContainer'
import type { Action } from 'models/action'

import { Map } from 'immutable'

import { defineRecord } from 'lib/records'

export const AppContainerState = defineRecord('AppContainerState', ({
  status: new Map({
    pending: true
  })
}: AppContainerStateShape))

export default function reducer(state: AppContainerStateRecord = AppContainerState(), { type }: Action<*>) {
  switch (type) {

    // reducers…

    default:
      return state
  }
}
