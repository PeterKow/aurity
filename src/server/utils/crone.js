var CronJob = require('cron').CronJob;
var checkGet = require('../app/twitterSearch.js').checkGet
var job = new CronJob('*/3 * * * *', function() {
    /*
     * Runs every weekday (Monday through Friday)
     * at 11:30:00 AM. It does not run on Saturday
     * or Sunday.
     */
  console.log('start CRONE', new Date)
  checkGet()
  }, function () {
  console.log('stop CRONE')
    /* This function is executed when the job stops */
  },
  true /* Start the job right now */
)

setTimeout(checkGet(), 2000)
//job.start();