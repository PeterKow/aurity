import Firebase from 'firebase'
var myDataRef = new Firebase('https://fiery-inferno-5861.firebaseio.com/tweets');
import store from 'utils/store'

export { syncTweets }
export { syncTweet }
export { initSync }
export { readTweets }

function syncTweet(article) {
  myDataRef.update(createFireArticle(article))
}

function syncTweets(tweets) {
  console.log('rt', tweets, window._userId)

  const myDataRefUser = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/' + window._userId );
  tweets.forEach(tweet => {
    //myDataRef.update(createFireArticle(tweet))
    myDataRefUser.update(createFireArticle(tweet))
  })
}

function readTweets(dispatch) {
  const myDataRefUser = new Firebase('https://fiery-inferno-5861.firebaseio.com/1627149078/' + window._userId );
  myDataRefUser.orderByKey().on('value', function(snapshot) {
    const newData = []
    const data =  snapshot.val()
    for( var tweet in data ) {
      newData.unshift(data[tweet])
    }
    console.log('------------', newData);
    dispatch({ type: 'FETCH_MINI_ARTICLES_SUCCESS', data: newData })
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function createFireArticle(tweet) {
  if (!tweet.quotedStatus) {
    delete tweet.quotedStatus
  }
  const data = {}
  data[tweet.id_str] = tweet
  console.log('sync ', data)
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