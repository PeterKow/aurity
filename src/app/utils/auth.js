import store from 'utils/store'
import storage from 'utils/localStorage'

const auth = {
  getTwitterTokens: getTwitterTokens,
  setTwitterTokens: setTwitterTokens,
}

export default auth

function getTwitterTokens() {
  let authData = false
  
  if (!!store.getState().user && !!store.getState().user.get('twitter')
    && !!store.getState().user.get('twitter').get('token')
    && !!store.getState().user.get('twitter').get('secret')) {
    authData = {
      token: store.getState().user.get('twitter').get('token'),
      secret: store.getState().user.get('twitter').get('secret'),
    }
  } else if (!!storage.get('twitter.token') && !!storage.get('twitter.secret')) {
    authData = {
      token: storage.get('twitter.token'),
      secret: storage.get('twitter.secret'),
    }
  }

  return authData;
}

function setTwitterTokens({ token, secret }) {
  storage.set('twitter.token', token)
  storage.set('twitter.secret', secret)
  console.log('token storage', token, secret)
}
