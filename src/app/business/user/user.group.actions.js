import { authTwitter, twitterFailed, twitterLogin, twitterLogout } from './user.actions.js'
import firebaseUser from 'business/firebase/firebaseUser.js'
import firebaseAuth from 'business/firebase/firebaseAuth.js'
import Firebase from 'firebase'
import history from 'utils/history.js'

export function authWithTwitter() {
  return dispatch => {
    dispatch(authTwitter())
    const ref = new Firebase('https://aurity.firebaseio.com');
    ref.authWithOAuthPopup('twitter', (error) => {
      if (error) {
        dispatch(twitterFailed(error))
      } else {
        // we will get update from auth firebase
        // dispatch(twitterSuccess(authData))
      }
    })
  }
}

export function logout() {
  return dispatch => {
    dispatch(twitterLogout())
    firebaseAuth.logout()
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
    firebaseUser.update({ uid, tokenFirebase, tokenTwitter, name, id, profileImageURL })
    history.pushState(null, '/', '/')
  }
}

