var qs = require('querystring');
var request = require('request');
var auth = require('../utils/auth.js')


module.exports = function(app){

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
      q: req.body.query
      //q: "@peter_kow"
      //q: req.params
    };

    console.log('query --> ', params.q)

    //url += qs.stringify(req.body);
    url += qs.stringify(params);

    console.log('url', url);

    var oauth = {
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret:  process.env.TWITTER_SECRET,
      token: req.body.token,
      token_secret: req.body.secret,
    };

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

  });

  app.post('/followers', auth.checkCookie, function(req, res) {

    console.log('Request -->', req.body);

    var url = 'https://api.twitter.com/1.1/followers/list.json?';

    var params = {
      // user_id: profile.id
      // user_id: 'gopeterpanworld'
      // id: '210462857140252672'
      // screen_name: "rsarver"
      //q: "%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4"
      //q: "job OR hire OR hiring OR looking OR apply AND react"
      user_id: req.body.query.user_id,
      count: req.body.query.count
      //q: "@peter_kow"
      //q: req.params
    };

    console.log('query --> ', params)

    //url += qs.stringify(req.body);
    url += qs.stringify(params);

    console.log('url', url);

    var oauth = {
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret:  process.env.TWITTER_SECRET,
      token: req.body.token,
      token_secret: req.body.secret,
    };

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

  });

}