import Immutable from 'immutable'
import { AUTH_TWITTER, TWITTER_FAILED, TWITTER_LOGIN, TWITTER_LOGOUT, UNAUTHORISED, LOGIN_SUCCESS, LIKED_USERS_LIST } from './user.actionTypes.js'

const initialState = createInitialState()

function userReducer(state = initialState, action = { type: undefined }) {
  switch (action.type) {
    case AUTH_TWITTER:
      return createInitialState()
    case TWITTER_FAILED:
      return createInitialState()
    case UNAUTHORISED:
      return createInitialState()
    case TWITTER_LOGIN:
      return state.merge(state, createUser(action.data))
    case TWITTER_LOGOUT:
      return createInitialState()
    case LOGIN_SUCCESS:
      return state.merge(state, createUser(action.data))
    case LIKED_USERS_LIST:
      return state.set('likedUserList', action.payload )
    default:
      return state
  }
}

export default userReducer

function createInitialState() {
  return new Immutable.Map({
    fetchingAuth: false,
    likedUserList: [],
  })
}

function createUser(data) {
  const user = {
    ...data,
    fetchingAuth: false,
  }

  return user
}
