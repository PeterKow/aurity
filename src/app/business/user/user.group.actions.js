import { authTwitter, twitterLogout } from './user.actions.js'
import { LOGIN_SUCCESS, UNAUTHORISED } from './user.actionTypes'
import history from 'utils/history.js'
import auth from 'utils/auth'

export function authWithTwitter() {
  return dispatch => {
    dispatch(authTwitter())
  }
}

export function logout() {
  return dispatch => {
    dispatch(twitterLogout())
    auth.removeTwitterTokens()
    history.pushState(null, '/login', '/login')
  }
}

export function unauthorised(data) {
  history.pushState(null, '/login', '/login')
  auth.removeTwitterTokens()
  return { type: UNAUTHORISED, data }
}

export function loginSuccess(response) {
  return dispatch => {
    const { __v, ...data } = response
    dispatch({type: LOGIN_SUCCESS, data})
    const { twitter: { secret, token }} = data
    auth.setTwitterTokens({ token, secret })
    history.replaceState(null, '/')
  }
}


