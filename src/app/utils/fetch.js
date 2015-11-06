import { unauthorised } from 'business/user/user.actions'
import store from 'utils/store'

export default function fetchService(url = throwIfMissing(), { credentials = 'same-origin', method = 'get' }) {
  return fetch(url, {
    credentials,
    method,
  })
    .then(checkErrors)
    .then(res => res.json())
}

function throwIfMissing() {
  throw new Error('Missing parameter');
}

function checkErrors(res) {
  switch (res.status) {
    case 401:
      store.dispatch(unauthorised())
      throw new Error('Unauthorised');
      break;
    default:
      return res
  }
}
