import Firebase from 'firebase'
var myDataRef = new Firebase('https://fiery-inferno-5861.firebaseio.com/tweets');
import store from 'utils/store'
import { likedUsersList } from 'business/user/user.actions'
import { updateArticleSuccess } from 'containers/articles/article.actions'

export { readUsers }
export { syncUsers }
export { syncTweets }
export { syncTweet }
export { initSync }
export { readTweets }

function syncTweet(article) {
  const myDataRefUser = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/' + window._userId );
  console.log('sync', article)
  myDataRefUser.update(createFireArticle(article), onComplete)

  function onComplete(error) {
    if (error) {
      console.log('Synchronization failed');
    } else {
      console.log('Synchronization succeeded');
      store.dispatch(updateArticleSuccess(article))
    }
  }
}

function syncUsers({ min_faves, min_retweets }) {
  const myDataRefUserLike = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/likedUsers/' + window._userId );
  console.log('save user', { userId: window._userId, screeName: window._screenName, min_faves, min_retweets })
  myDataRefUserLike.update({ userId: window._userId, screeName: window._screenName, min_faves, min_retweets})
}

function readUsers(dispatch) {
  const myDataRefUserLike = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/likedUsers' );
  myDataRefUserLike.orderByKey().on('value', function(snapshot) {
    const newData = []
    const data =  snapshot.val()
    for (var user in data ) {
      newData.unshift(data[user])
    }
    //console.log('------------ users', newData);
    dispatch(likedUsersList(newData))
  }, function (errorObject) {
    console.log("The read user failed: " + errorObject.code);
  });
}

function syncTweets(tweets) {
  const myDataRefUser = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/' + window._userId );
  tweets.forEach(tweet => {
    //console.log('createFireArticle(tweet)', createFireArticle(tweet))
    myDataRefUser.update(createFireArticle(tweet))
  })
}

function readTweets(dispatch) {
  window._source = 'firebase'
  const myDataRefUser = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/' + window._userId );
  myDataRefUser.orderByKey().on('value', function(snapshot) {
    const newData = []
    const data =  snapshot.val()
    for( var tweet in data ) {
      newData.unshift(data[tweet])
    }
    //console.log('------------', newData);
    dispatch({ type: 'FETCH_MINI_ARTICLES_SUCCESS', data: newData })
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function createFireArticle(tweet) {

  // sometime there is no ex. quoted data, and therefore is undefined, for now delete this, while we can't save this in firebase
  // in future refine data  on entry -> when creating article from tweet
  for (var key in tweet) {
    if (tweet[key] === undefined) {
      delete tweet[key]
    }
  }
  const data = {}
  data[tweet.id_str] = tweet
  return data
}

function initSync() {

  //let unsubscribe = store.subscribe(handleChange)
  //handleChange()
  //
  //function select(state) {
  //  return state.miniarticles
  //}
  //
  //let currentValue
  //
  //function handleChange() {
  //  let previousValue = currentValue
  //  currentValue = select(store.getState())
  //
  //  if (previousValue !== currentValue) {
  //    console.log('Some deep nested property changed from', previousValue, 'to', currentValue)
  //  }
  //}
}