import Firebase from 'firebase'
import { twitterSuccess } from 'business/user/user.group.actions.js'
import store from 'utils/store.js'

//const userRef = new Firebase("https://aurity.firebaseio.com/users");

//userRef.on("value", function(snapshot) {
//  console.log(snapshot.val());
//}, function (errorObject) {
//  console.log("The read failed: " + errorObject.code);
//});

const authRef = new Firebase("https://aurity.firebaseio.com");

authRef.onAuth(function(authData) {

  if (authData) {
    store.dispatch(twitterSuccess(authData))
    //// save the user's profile into the database so we can list users,
    //// use them in Security and Firebase Rules, and show profiles
    //authRef.child("users").child(authData.uid).set({
    //  provider: authData.provider,
    //  name: authData.twitter.displayName
    //});
  }
});

const auth = {
  isLoggedIn: isLoggedIn,
  logout: logout
}

export default auth

function logout() {
  authRef.unauth();
}

function isLoggedIn() {
  return authRef.getAuth()
}