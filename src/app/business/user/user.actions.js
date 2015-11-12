import { AUTH_TWITTER, TWITTER_LOGIN, TWITTER_FAILED, TWITTER_LOGOUT, UNAUTHORISED } from './user.actionTypes.js'
import fetch from 'isomorphic-fetch'
import * as storage from '../../persistance/storage.js'
import history from 'utils/history'

export function authTwitter() {
  return { type: AUTH_TWITTER }
}

export function twitterLogin(data) {
  return { type: TWITTER_LOGIN, data }
}

export function twitterFailed(data) {
  return { type: TWITTER_FAILED, data }
}

export function twitterLogout() {
  return { type: TWITTER_LOGOUT }
}
