import { fetchMiniArticles, fetchMiniArticlesSuccess, fetchMiniArticlesFailed } from './article.actions.js'

export function startFetchMiniArticles() {
  return dispatch => {
    dispatch(fetchMiniArticles())

    return fetch('/search/twitter', {
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
    //return fetch('https://api.twitter.com/1.1/statuses/show.json?id=210462857140252672')
    //  , {
    //  headers: {
    //    'Access-Control-Allow-Origin': '*',
    //  }
    //})
    //// return fetch('https://api.github.com/users/peterkow')
    // return fetch('https://www.googleapis.com/drive/v2/files?access_token=1/fFBGRNJru1FQd44AzqT3Zg')
    //  .then(res => res.json())
     //.then (res => console.log('res', res))
    //.catch(response => {
    //  console.log('response', response)
    //  console.log('response', response.headers.get())
    //
    //})

    //Access-Control-Allow-Origin
    //makeCorsRequest()
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
