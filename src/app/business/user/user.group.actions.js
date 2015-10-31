import { authTwitter } from './user.actions.js'
import Firebase from 'firebase'

export function authWithTwitter() {
  return dispatch => {
    dispatch(authTwitter())
    const ref = new Firebase('https://aurity.firebaseio.com');
    ref.authWithOAuthPopup('twitter', function(error, authData) {
      if (error) {
        console.log('error', error)
      } else {
        console.log('data', authData)
      }
    })
  }
}