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
      body: JSON.stringify(twitterTokens),
    })
      .then(res => {
        const data = res.message.statuses.map(mapTwitterResponse)

        dispatch(fetchMiniArticlesSuccess(data))
      })
      .catch(res => {
        console.log('FAILED res ', res)
        dispatch(fetchMiniArticlesFailed(res))
      })
  }
}

function mapTwitterResponse(data) {
  return {
    id: data.id,
    text: data.text,
    completed: false,
    image: data.user.profile_image_url_https,
  }
}
