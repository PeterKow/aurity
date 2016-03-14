var CronJob = require('cron').CronJob;
var checkGet = require('../app/twitterSearch.js').checkGet
var getFriends = require('../app/twitterSearch.js').getFriends
var getLookupUsers = require('../app/twitterSearch.js').getLookupUsers
var userFirends = require('../mock/users.mock.js').userFirends

//var croneTime = '*/3 * * * *'
var croneTime = '42 21 * * *'
console.log('CRON SET FOR: ', croneTime)
var job = new CronJob(croneTime, function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
  console.log('start CRONE', new Date)
  syncTweetsAll()
  }, function () {
  console.log('stop CRONE')
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */
)

var user = 'dan_abramov'
//var user = '70345946'
//var user = 'peter_kow'
var minRetweets = 0
var minFaves = 0


var cronQuery = { body: { query:  "from:" + user + " min_retweets:" + minRetweets + " OR min_faves:" + minFaves }}
//setTimeout( getFriends({ body: { query: "CRONE TASK friends" }}, null, syncFriendsTweets), 2000)
//setTimeout(checkGet(cronQuery), 2000)
//setTimeout(syncTweetsAll(), 2000)
job.start();


//next_cursor: 1528715716440134400,
//  next_cursor_str: '1528715716440134330',
//  previous_cursor: 0,
//  previous_cursor_str: '0' }

function syncFriendsTweets(data) {
  console.log('Friends list # ', data.ids.length )

  var idsSearch = data.ids.reduce(function(old, newId) {
    return old + ", "+ newId
  })

  console.log('idsSearch', idsSearch)

  getLookupUsers({ body: { query: { user_id: idsSearch }}}, null, function(data){
    //console.log('users list', data.map(function(user) { return user.screen_name }))
    console.log('users list', data.map(function(user) { return user.screen_name }))
  })

}

function syncTweetsAll (){

  var minRetweets = 0
  var minFaves = 0

  userFirends.map(function(user_screen) {
    var cronQuery = { body: { query:  "from:" + user_screen + " min_retweets:" + minRetweets + " OR min_faves:" + minFaves }}
    checkGet(cronQuery)
  })
}