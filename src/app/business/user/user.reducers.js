import Immutable from 'immutable'
import { AUTH_TWITTER, TWITTER_FAILED, TWITTER_LOGIN, TWITTER_LOGOUT } from './user.actionTypes.js'
import * as storage from '../../utils/localStorage.js'

const initialState = new Immutable.Map({
  tokens: {
    twitter: storage.get('token'),
  },
  fetchingAuth: false,
})

function userReducer(state = initialState, action = { type: undefined }) {
  switch (action.type) {
  case AUTH_TWITTER:
    return state.set('fetchingAuth', true)
  case TWITTER_FAILED:
    return state.set('fetchingAuth', false)
  case TWITTER_LOGIN:
    storage.setItem('token', action.data.tokenTwitter)
    return state.merge(state, { tokens: { twitter: action.data.tokenTwitter }, fetchingAuth: false})
  case TWITTER_LOGOUT:
    return state.merge(state, { tokens: { twitter: {} }})
  default:
    return state
  }
}

export default userReducer
