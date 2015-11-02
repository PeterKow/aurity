import Firebase from 'firebase'
import { twitterSuccess } from 'business/user/user.group.actions.js'
import store from 'utils/store.js'

const authRef = new Firebase('https://aurity.firebaseio.com');

authRef.onAuth( (authData) => {
  if (authData) {
    store.dispatch(twitterSuccess(authData))
  }
});

const auth = {
  isLoggedIn: isLoggedIn,
  logout: logout,
}

export default auth

function logout() {
  authRef.unauth();
}

function isLoggedIn() {
  return authRef.getAuth()
}
