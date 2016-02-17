import { unauthorised } from 'business/user/user.group.actions'
import store from 'utils/store'
import fetchService from 'utils/fetch'
import auth from 'utils/auth'

export function getFollowers() {
  const twitterTokens = auth.getTwitterTokens()
  if (!twitterTokens) {
    return store.dispatch(unauthorised('notTokensOnTheClient'))
  }
  const query = {
    user_id: 70345946,
    count: 200
  }
  return fetchService('/followers', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({...twitterTokens, query}),
  })
}
