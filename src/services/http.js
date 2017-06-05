import 'isomorphic-fetch'
import { goToLogin } from '../routes'

function getAuthorizationHeaders() {
  return {
    Authorization: `Bearer xxxx`
  }
}

function getDefaultHeaders() {
  return {
    ...getAuthorizationHeaders(),
    'Content-Type': 'application/json'
  }
}

function handleNotAuthenticated(res) {
  if (!res.ok && res.status === 401) {
    console.error('Not authenticated') // eslint-disable-line no-console
    goToLogin()
    return Promise.reject(res.json())
  }
  return res
}

function handleForbidden(res) {
  if (!res.ok && res.status === 403) {
    console.error('Forbidden') // eslint-disable-line no-console
    goToLogin()
    return Promise.reject(res.json())
  }
  return res
}

function handleError(res) {
  if (!res.ok) {
    console.error('An error occurred') // eslint-disable-line no-console
    return Promise.reject(res.json())
  }
  return res.json()
}

function fetcher(url, options) {
  return fetch(url, options)
    .then(handleNotAuthenticated)
    .then(handleForbidden)
    .then(handleError)
}

function get(url, headers = {}) {
  return fetcher(url, {
    headers: Object.assign({}, getDefaultHeaders(), headers)
  })
}

function post(url, body, headers = {}) {
  return fetcher(url, {
    method: 'POST',
    headers: Object.assign({}, getDefaultHeaders(), headers),
    body: JSON.stringify(body)
  })
}

// `post` version without json body
function postData(url, body, headers = {}) {
  return fetcher(url, {
    method: 'POST',
    headers: Object.assign({}, getAuthorizationHeaders(), headers),
    body
  })
}

function put(url, body, headers = {}) {
  return fetcher(url, {
    method: 'PUT',
    headers: Object.assign({}, getDefaultHeaders(), headers),
    body: JSON.stringify(body)
  })
}

function remove(url, headers = {}) {
  return fetcher(url, {
    method: 'DELETE',
    headers: Object.assign({}, getDefaultHeaders(), headers)
  })
}

export { get, post, postData, put, remove }
