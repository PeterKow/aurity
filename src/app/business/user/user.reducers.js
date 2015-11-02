import Immutable from 'immutable'
import { AUTH_TWITTER, TWITTER_FAILED, TWITTER_LOGIN, TWITTER_LOGOUT } from './user.actionTypes.js'

const initialState = createInitialState()

function userReducer(state = initialState, action = { type: undefined }) {
  switch (action.type) {
    case AUTH_TWITTER:
      return state.set('fetchingAuth', true)
    case TWITTER_FAILED:
      return state.set('fetchingAuth', false)
    case TWITTER_LOGIN:
      return state.merge(state, createUser(action.data))
    case TWITTER_LOGOUT:
      return createInitialState()
    default:
      return state
  }
}

export default userReducer

function createInitialState() {
  return new Immutable.Map({
    fetchingAuth: false,
  })
}

function createUser(data) {
  const { uid, tokenFirebase, tokenTwitter, name, id, profileImageURL } = data

  const user = {
    name,
    idFirebase: uid,
    tokenFirebase,
    profileImageURL,
    twitter: {
      token: tokenTwitter,
      id,
    },
    fetchingAuth: false,
  }

  return user
}
