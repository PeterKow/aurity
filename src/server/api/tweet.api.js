var Tweet = require('../model/tweet.model.js')
var ObjectId = require('mongoose').Types.ObjectId;

exports.syncTweets = syncTweets

function syncTweets(tweets) {

  console.log('TRY SAVE TWEETS')
  tweets.map(function(tweet){

    saveTweet(tweet)
  })
}

function saveTweet(tweet){
  Tweet.where( { id :  tweet.id})
    .update(
      { id :  tweet.id},
      tweet,
      { upsert: true},
      function (err) {
        if (err) {
          console.log('Error saving Tweet', err)
          throw err;
        }
        //console.log('success SAVE', err)
      })

}