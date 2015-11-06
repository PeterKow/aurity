import KeyMirror from 'keymirror'

const actionTypes = new KeyMirror({
  AUTH_TWITTER: null,
  TWITTER_LOGIN: null,
  TWITTER_FAILED: null,
  TWITTER_LOGOUT: null,
  UNAUTHORISED: null,
})

Object.freeze(actionTypes)

export default(actionTypes)
