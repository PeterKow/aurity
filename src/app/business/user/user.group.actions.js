import { authTwitter, twitterFailed, twitterLogin, twitterLogout } from './user.actions.js'
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

export function twitterSuccess(authData) {
  return dispatch => {
    const {
      token: tokenFirebase,
      uid,
      twitter: {
        accessToken: tokenTwitter,
        displayName: name,
        id,
        profileImageURL,
        },
      } = authData;

    dispatch(twitterLogin({ uid, tokenFirebase, tokenTwitter, name, id, profileImageURL }))
    console.log('location', window.location.pathname)
    if ( window.location.pathname !== '/') {
      console.log('goo')
      history.replaceState(null, '/')
    }
  }
}

