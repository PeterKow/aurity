import { authTwitter, twitterFailed, twitterLogin, twitterLogout } from './user.actions.js'
import { LOGIN_SUCCESS } from './user.actionTypes'
import history from 'utils/history.js'

export function authWithTwitter() {
  return dispatch => {
    dispatch(authTwitter())
  }
}

export function logout() {
  return dispatch => {
    dispatch(twitterLogout())
  }
}

export function loginSuccess(response) {
  const { __v, ...data } = response
  history.replaceState(null, '/')
  return { type: LOGIN_SUCCESS, data }
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
    //firebaseUser.update({ uid, tokenFirebase, tokenTwitter, name, id, profileImageURL })
    console.log('location', window.location.pathname)
    if ( window.location.pathname !== '/') {
      console.log('goo')
      history.replaceState(null, '/')
    }
  }
}

