import { fetchMiniArticles, fetchMiniArticlesSuccess, fetchMiniArticlesFailed } from './article.actions.js'
import { unauthorised } from 'business/user/user.group.actions'
import fetchService from 'utils/fetch'
import auth from 'utils/auth'

export function startFetchMiniArticles(payload = {}) {
  return dispatch => {
    dispatch(fetchMiniArticles(payload))
    //const from:dan_abramov
    const user = payload.search ? payload.search : 'dan_abramov'
    const minRetweets = 10
    const minFaves = 10
    const query = "from:" + user + " min_retweets:" + minRetweets + " OR min_faves:" + minFaves
    console.log('query', query)
    return sendRequest(dispatch, query)
  }
}

export function startFetchMiniArticlesReply() {
  return dispatch => {
    dispatch(fetchMiniArticles())

    //const from:dan_abramov
    const minRetweets = 10
    const minFaves = 10
    const query = "from:dan_abramov min_retweets:" + minRetweets + " OR min_faves:" + minFaves
    return sendRequest(dispatch, query)
  }
}

function mapTwitterResponse(data) {
  //console.log('data', data.entities)
  return {
    id: data.id,
    id_str: data.id_str,
    text: expandUrls(data.text, data.entities.urls),
    completed: false,
    profileImage: data.user.profile_image_url_https,
    favoriteCount: data.favorite_count,
    retweetCount: data.retweet_count,
    image: getMedia( data.entities.media),
    entities: data.entities,
    quotedStatus: data.quoted_status,
    user: data.user,
  }
}

function getMedia(media = []) {
  return media[0] ? media[0].media_url_https : ''
}

function expandUrls(text, urls) {
  let newText = text
  urls.forEach(url => {
    newText = newText.replace(url.url, url.expanded_url)
  })
  return newText
}

function sendRequest(dispatch, query) {
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
    body: JSON.stringify({ ...twitterTokens, query }),
  })
    .then(res => {
      const data = res.message.statuses.map(mapTwitterResponse)

      //console.log('daaaa', data[0].user.id)
      window._userId =  data[0].user.id
      dispatch(fetchMiniArticlesSuccess(data))
    })
    .catch(res => {
      dispatch(fetchMiniArticlesFailed(res))
    })
}