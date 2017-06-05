import Conf from './conf'
import { get, put } from './http'

export function updateUser(user) {
  return put(`${Conf.get('api')}/user`, user)
}

export function fetchUser(id) {
  return get(`${Conf.get('api')}/user/${id}`)
}
