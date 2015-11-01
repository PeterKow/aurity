import { authTwitter, twitterFailed, twitterLogin } from './user.actions.js'
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
      twitter: {
        accessToken: tokenTwitter,
        displayName: name,
        id,
        profileImageURL
        }
      } = authData;

    dispatch(twitterLogin({ tokenFirebase, tokenTwitter, name, id, profileImageURL }))
    //dispatch(addUser({ tokenFirebase, tokenTwitter, name, id, profileImageURL }))
  }
}

function addUser({ tokenFirebase, tokenTwitter, name, id, profileImageURL }) {
  var userRef = new Firebase("https://aurity.firebaseio.com/user");
  userRef.update( { name, id, profileImageURL, tokenFirebase, tokenTwitter  } )
  return { type: 'ADD_USER'}

}