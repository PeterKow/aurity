var qs = require('querystring');
var request = require('request');
var auth = require('../utils/auth.js')
var syncTweets = require('../api/tweet.api.js').syncTweets

exports.checkGet = checkGet
exports.getFollowers = getFollowers
exports.getFriends = getFriends
exports.getLookupUsers = getLookupUsers

exports.twitterApi = function(app){

  app.get('/check', checkGet);

  app.post('/followers', auth.checkCookie, getFollowers);

  app.post('/search/twitter', auth.checkCookie, function(req, res) {

    console.log('Request -->', req.body);

    var url = 'https://api.twitter.com/1.1/search/tweets.json?';

    var params = {
      // user_id: profile.id
      // user_id: 'gopeterpanworld'
      // id: '210462857140252672'
      // screen_name: "rsarver"
      //q: "%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4"
      //q: "job OR hire OR hiring OR looking OR apply AND react"
      q: req.body.query,
      //q: "@peter_kow"
      //q: req.params
      count: 100,
    };

    console.log('query --> ', params.q)

    //url += qs.stringify(req.body);
    url += qs.stringify(params);

    console.log('url', url);

    var oauth = getAuth(req);

    console.log('auth --> ', oauth)

    request.get({
      url: url,
      oauth: oauth,
      json: true
    }, function(e, r, result) {

      //console.log("result", result);

      if(result.errors){
        console.log("result error", result.errors[0].code);
        if (result.errors[0].code === 32) {
          return res.status(401).send({
            message: result.errors[0].message
          });
        }
      }
      // console.log(result);
      return res.status(200).send({
        message: result
      });
      // [MOVED] db.save moved into second callback function
      // user.save(function(err) {
      //   if (err)
      //     throw err;
      //   return done(null, user);
      // });
    });
  })

}


function checkGet (req, res) {

  var oauth = getAuth(req);
  var url = 'https://api.twitter.com/1.1/search/tweets.json?';

  var params = {
    // user_id: profile.id
    // user_id: 'gopeterpanworld'
    // id: '210462857140252672'
    // screen_name: "rsarver"
    //q: "%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4"
    //q: "job OR hire OR hiring OR looking OR apply AND react"
    q: req.body.query,
    //q: "@peter_kow"
    //q: req.params
    count: 100,
  };


  console.log('query --> ', params.q)
  //url += qs.stringify(req.body);
  url += qs.stringify(params);

  console.log('url', url);

  request.get({
    url: url,
    oauth: oauth,
    json: true
  }, function(e, r, result) {


    if(result.errors){
      console.log("result error", result.errors[0].code);
      if (result.errors[0].code === 32) {
        errorHandling(res, result)
      }
    }
    // console.log(result);
    if(res){
      return res.status(200).send({
        message: result
      });
    } else {
      // CRONE
      console.log('CRONE: Syncing new tweets - length: ', result.statuses.length)
      //console.log('GOT, ',result.statuses)
      syncTweets(result.statuses)
    }
  });
}
function checkGet (req, res) {

  var oauth = getAuth(req);
  var url = 'https://api.twitter.com/1.1/search/tweets.json?';

  var params = {
    // user_id: profile.id
    // user_id: 'gopeterpanworld'
    // id: '210462857140252672'
    // screen_name: "rsarver"
    //q: "%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4"
    //q: "job OR hire OR hiring OR looking OR apply AND react"
    q: req.body.query,
    //q: "@peter_kow"
    //q: req.params
    count: 100,
  };


  console.log('query --> ', params.q)
  //url += qs.stringify(req.body);
  url += qs.stringify(params);

  console.log('url', url);

  request.get({
    url: url,
    oauth: oauth,
    json: true
  }, function(e, r, result) {


    if(result.errors){
      console.log("result error", result.errors[0].code);
      if (result.errors[0].code === 32) {
        errorHandling(res, result)
      }
    }
    // console.log(result);
    if(res){
      return res.status(200).send({
        message: result
      });
    } else {
      // CRONE
      console.log('CRONE: Syncing new tweets - length: ', result.statuses.length)
      //console.log('GOT, ',result.statuses)
      syncTweets(result.statuses)
    }
  });
}

function getFollowers(req, res, cb) {

  console.log('Request -->', req.body);

  var url = 'https://api.twitter.com/1.1/followers/list.json?';
  // dan id: 70345946
  var params = {
    user_id: req.body.query.user_id || 1627149078,
    count: req.body.query.count || 2048
  };

  console.log('query --> ', params)

  url += qs.stringify(params);

  console.log('url', url);

  var oauth = getAuth(req);

  request.get({
    url: url,
    oauth: oauth,
    json: true
  }, function(e, r, result) {

    //console.log('result', result)
    if(result.errors){
      console.log("result error", result.errors[0].code);
      if (result.errors[0].code === 32) {
        errorHandling(res, result)
      }
    }

    if(res) {
      return res.status(200).send({
        message: result
      })
    } else {
     return cb(result)
    }
  });

}
function getFriends(req, res, cb) {

  console.log('Request -->', req.body);

  var url = 'https://api.twitter.com/1.1/friends/ids.json?'
  // dan id: 70345946
  var params = {
    user_id: req.body.query.user_id || 1627149078,
    count: req.body.query.count || 100
  };

  console.log('query --> ', params)

  url += qs.stringify(params);

  console.log('url', url);

  var oauth = getAuth(req);

  //console.log('auth --> ', oauth)

  request.get({
    url: url,
    oauth: oauth,
    json: true
  }, function(e, r, result) {

    //console.log('result', result)
    if(result.errors){
      console.log("result error", result.errors[0].code);
      if (result.errors[0].code === 32) {
        errorHandling(res, result)
      }
    }

    if(res) {
      return res.status(200).send({
        message: result
      })
    } else {
     return cb(result)
    }
  });

}

function getLookupUsers(req, res, cb) {

  console.log('Request -->', req.body);

  // dan id: 70345946
  var params = {
    user_id: req.body.query.user_id
  };


  var url = createUrl('https://api.twitter.com/1.1/users/lookup.json?', params)
  var oauth = getAuth(req);

  request.get({
    url: url,
    oauth: oauth,
    json: true
  }, function(e, r, result) {

    //console.log('result', result)
    if(result.errors){
      console.log("result error", result.errors[0].code);
      if (result.errors[0].code === 32) {
        errorHandling(res, result)
      }
    }

    if(res) {
      return res.status(200).send({
        message: result
      })
    } else {
     return cb(result)
    }
  });

}

function errorHandling(res, result){
  if(res) {
    return res.status(401).send({
      message: result.errors[0].message
    })
  } else {
    // CRONE
    console.log('CRONE failed ', result)
  };
}


function getAuth(req){
  const auth = {
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret:  process.env.TWITTER_SECRET,
    token: req.body.token || process.env.TW_ACCESS_TOKEN,
    token_secret: req.body.secret || process.env.TW_ACCESS_TOKEN_SECRET,
  }
  console.log('auth', auth)
  return auth
}

function createUrl(urlHead, params){
  console.log('query --> ', params)
  var  url = urlHead + qs.stringify(params);
  console.log('url', url);
  return url
}