import { AUTH_TWITTER, TWITTER_LOGIN, TWITTER_FAILED, TWITTER_LOGOUT } from './user.actionTypes.js'
import fetch from 'isomorphic-fetch'
import * as storage from '../../persistance/storage.js'

import Twit from 'node-twitter'

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


export function kosz() {
  return dispatch => {
    dispatch({ type: AUTH_TWITTER })

    // TODO change url generic solution
    return fetch('http://127.0.0.1:8000/profile', {
      credentials: 'same-origin',
    })
      .then(checkStatusCode)
      .then(responseToJson)
      .then(data => {
        if (data._id && data.twitter.token) {
          storage.put('token', data.twitter.token)

          //accessToken: "1627149078-W11Zxz9Kffwf7sskctuhChgNKPxMzzavXarkM4k"
          //accessTokenSecret: "dfuTWCuExC145nbQQYNCmKPNlapxG6LFh7FKQPsoS0nwD"

          var T = new Twit({
            consumer_key:         '1627149078-W11Zxz9Kffwf7sskctuhChgNKPxMzzavXarkM4k'
            , consumer_secret:      'dfuTWCuExC145nbQQYNCmKPNlapxG6LFh7FKQPsoS0nwD'
            , access_token:         'QFX2VuvqJDIwAorheGUyafkvW'
            , access_token_secret:  'lDtbSxgEtBVe5wyQYdY2zOU4Y77ZtlocSXaH2ex5gbTR28sKs9'
          })

          var params = {screen_name: 'nodejs'};
          T.get('statuses/user_timeline', params, function(error, tweets, response){
            if (!error) {
              console.log(tweets);
            }
          });

          //T.get('search/tweets', { q: 'banana', count: 100 }, function(err, data, response) {
          //  console.log('err',err)
          //  console.log('data',data)
          //})


          dispatch(twitterLogin(data))
          // TODO create more dumb components and move dispatcher to parent -> actionName=dispatch(actionName()) and then child will just call this! :)
        } else {
          handleError()
        }
      })
      .catch(handleError);

    // TODO abstract error handling to separate service
    function responseToJson(res) {
      return res.json()
    }

    // TODO abstract error handling to separate service
    function checkStatusCode(res) {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res
    }

    function handleError(res) {
      dispatch(twitterFailed())
      console.log('ended BADD!!! from authTwitter', res)
      // TODO : fix routing not through the window
      // window.history.pushState(null, null, '/login')
    }
  }
}
