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
      }
    })
  }
}