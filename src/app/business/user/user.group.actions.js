import { authTwitter } from './user.actions.js'

export function authWithTwitter() {
  return dispatch => {
    dispatch(authTwitter())
  }
}