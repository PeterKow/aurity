import { AUTH_TWITTER, TWITTER_LOGIN, TWITTER_FAILED, TWITTER_LOGOUT, LIKED_USERS_LIST } from './user.actionTypes.js'

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

export function likedUsersList(payload) {
  return { type: LIKED_USERS_LIST, payload }
}
