var CronJob = require('cron').CronJob;
var checkGet = require('../app/twitterSearch.js').checkGet
var getFriends = require('../app/twitterSearch.js').getFriends
var job = new CronJob('*/3 * * * *', function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
  console.log('start CRONE', new Date)
  //checkGet()
  }, function () {
  console.log('stop CRONE')
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */
)

var user = 'dan_abramov'
//var user = 'peter_kow'
var minRetweets = 0
var minFaves = 0


var cronQuery = { body: { query:  "from:" + user + " min_retweets:" + minRetweets + " OR min_faves:" + minFaves }}
//setTimeout( getFriends({ body: { query: "CRONE TASK friends" }}, null, function(data) { console.log('friends!: ', data.ids.length, data.next_cursor_str )}), 2000)
//setTimeout(checkGet(cronQuery), 2000)
//job.start();


//next_cursor: 1528715716440134400,
//  next_cursor_str: '1528715716440134330',
//  previous_cursor: 0,
//  previous_cursor_str: '0' }