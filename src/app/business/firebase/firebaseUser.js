import Firebase from 'firebase'

const userRef = new Firebase("https://aurity.firebaseio.com/users");

const user = {
  update: update,
  get: getUser
}

function getUser(id) {
  const userId = userRef.child(id)
  userId.once('value', function(data) {
    return data.val()
  });
}

function update({ uid, tokenFirebase, tokenTwitter, name, id, profileImageURL }) {
  userRef.child(uid).set({ name, id, profileImageURL, tokenFirebase, tokenTwitter })
}

export default user