import { unauthorised } from 'business/user/user.group.actions'
import store from 'utils/store'
import fetch from 'isomorphic-fetch'

export default function fetchService(url = throwIfMissing(), { credentials = 'same-origin', method = 'get', ...other } = {}) {
  return fetch(url, {
    credentials,
    method,
    ...other,
  })
    .then(checkErrors)
    .then(res => res.json())
}

function throwIfMissing() {
  throw new Error('Missing parameter')
}

function checkErrors(res) {
  switch (res.status) {
    case 401:
      store.dispatch(unauthorised('Api call unauthorised'))
      throw new Error('Unauthorised');
    default:
      return res
  }
}
