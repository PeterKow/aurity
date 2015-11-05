var qs = require('querystring');
var request = require('request');


module.exports = function(app){

  app.post('/search/twitter', function(req, res) {

    // console.log("stubbed request");
    // return res.status(200).send({
    //     message: getSearchTwitter()
    // });

    console.log(req.body);
    console.log("sdsd");

    // var url = 'https://api.twitter.com/1.1/users/show.json?';
    var url = 'https://api.twitter.com/1.1/search/tweets.json?';

    var params = {
      // user_id: profile.id
      // user_id: 'gopeterpanworld'
      // id: '210462857140252672'
      // screen_name: "rsarver"
      //q: "%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4"
      q: "job OR hire OR hiring OR looking OR apply AND react"
      //q: "@peter_kow"
      //q: req.params
    };

    //url += qs.stringify(req.body);
    url += qs.stringify(params);

    console.log('url', url);

    var oauth = {
      consumer_key: process.env.TWITTER_KEY,
      consumer_secret:  process.env.TWITTER_SECRET,
      token: '1627149078-W11Zxz9Kffwf7sskctuhChgNKPxMzzavXarkM4k',
      token_secret: 'dfuTWCuExC145nbQQYNCmKPNlapxG6LFh7FKQPsoS0nwD'
    };

    console.log('auth --> ', oauth)


    request.get({
      url: url,
      oauth: oauth,
      json: true
    }, function(e, r, result) {

      console.log("result");
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