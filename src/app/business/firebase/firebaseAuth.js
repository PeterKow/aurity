import Firebase from 'firebase'
import { twitterSuccess } from 'business/user/user.group.actions.js'
import store from 'utils/store.js'

//const userRef = new Firebase("https://aurity.firebaseio.com/users");

//userRef.on("value", function(snapshot) {
//  console.log(snapshot.val());
//}, function (errorObject) {
//  console.log("The read failed: " + errorObject.code);
//});

let logedIn = false;

var authRef = new Firebase("https://aurity.firebaseio.com");

authRef.onAuth(function(authData) {

  console.log('authData', authData)

  store.dispatch(twitterSuccess(authData))
  logedIn = true
  if (authData && false) {
    // save the user's profile into the database so we can list users,
    // use them in Security and Firebase Rules, and show profiles
    authRef.child("users").child(authData.uid).set({
      provider: authData.provider,
      name: authData.twitter.displayName
    });
  }
});

const auth = {
  isLoggedIn: isLoggedIn
}

export default auth

function isLoggedIn() {
  return logedIn;
}