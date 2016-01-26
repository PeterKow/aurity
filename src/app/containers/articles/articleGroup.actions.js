import { fetchMiniArticles, fetchMiniArticlesSuccess, fetchMiniArticlesFailed } from './article.actions.js'
import { unauthorised } from 'business/user/user.group.actions'
import fetchService from 'utils/fetch'
import auth from 'utils/auth'

export function startFetchMiniArticles() {
  return dispatch => {
    dispatch(fetchMiniArticles())

    const twitterTokens = auth.getTwitterTokens()
    if (!twitterTokens) {
      return dispatch(unauthorised('notTokensOnTheClient'))
    }

    return fetchService('/search/twitter', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...twitterTokens, minRetweets: 10, minFaves: 10 }),
    })
      .then(res => {
        const data = res.message.statuses.map(mapTwitterResponse)

        dispatch(fetchMiniArticlesSuccess(data))
      })
      .catch(res => {
        dispatch(fetchMiniArticlesFailed(res))
      })
  }
}

function mapTwitterResponse(data) {
  console.log('data', data.entities.media)
  return {
    id: data.id,
    text: data.text,
    completed: false,
    profileImage: data.user.profile_image_url_https,
    favoriteCount: data.favorite_count,
    retweetCount: data.retweet_count,
    image: getMedia( data.entities.media),
  }
}

function getMedia(media = []) {
  return media[0] ? media[0].media_url_https : ''
}
