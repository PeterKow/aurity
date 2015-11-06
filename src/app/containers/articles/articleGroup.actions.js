import { fetchMiniArticles, fetchMiniArticlesSuccess, fetchMiniArticlesFailed } from './article.actions.js'

export function startFetchMiniArticles() {
  return dispatch => {
    dispatch(fetchMiniArticles())

    return fetch('/search/twitter', {
      credentials: 'same-origin',
      method: 'post',
    })
      .then(res => res.json())
      .then(res => {
        const data = res.message.statuses.map(mapTwitterResponse)

        dispatch(fetchMiniArticlesSuccess(data))
        console.log('res', res)
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
