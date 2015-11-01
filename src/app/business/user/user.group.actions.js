import { authTwitter, twitterFailed, twitterLogin } from './user.actions.js'
import firebaseUser from 'business/firebase/firebaseUser.js'
import Firebase from 'firebase'

export function authWithTwitter() {
  return dispatch => {
    dispatch(authTwitter())
    const ref = new Firebase('https://aurity.firebaseio.com');
    ref.authWithOAuthPopup('twitter', function(error, authData) {
      if (error) {
        dispatch(twitterFailed(error))
      } else {
        dispatch(twitterSuccess(authData))
      }
    })
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
        profileImageURL
        }
      } = authData;

    dispatch(twitterLogin({ tokenFirebase, tokenTwitter, name, id, profileImageURL }))
    firebaseUser.update({ uid, tokenFirebase, tokenTwitter, name, id, profileImageURL })
  }
}

