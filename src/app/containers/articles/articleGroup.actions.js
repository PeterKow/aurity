import { fetchMiniArticles, fetchMiniArticlesSuccess, fetchMiniArticlesFailed } from './article.actions.js'
import fetchService from 'utils/fetch'

export function startFetchMiniArticles() {
  return dispatch => {
    dispatch(fetchMiniArticles())

    return fetchService('/search/twitter', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: '1627149078-W11Zxz9Kffwf7sskctuhChgNKPxMzzavXarkM4k',
        token_secret: 'dfuTWCuExC145nbQQYNCmKPNlapxG6LFh7FKQPsoS0nwD',
      }),
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
