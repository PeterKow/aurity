/**
 * Created by Peter on 29/08/15.
 */
var path = require('path');
var twitterSearch = require('./twitterSearch')

module.exports = function(app, passport) {

  // add routes for twitter search
  twitterSearch(app)


  // route for showing the profile page
  app.get('/profile', isLoggedIn, function(req, res) {
    const response = req.user
    console.log('res -- profile', response, req.isAuthenticated())
    return res.send(response);
  });

  // route for login out
  //app.get('/login', function(req, res) {
  //  res.sendFile(path.join(publicPath, 'index.html'));
  //});

  // route for logging out
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // =====================================
  // TWITTER ROUTES ======================
  // =====================================
  // route for twitter authentication and login

  app.get('/auth/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
    successRedirect : '/authMe',
    failureRedirect : '/login'
      // TODO check example below for full redirection
  }))

  //  function (req, res, next) {
  //  passport.authenticate('twitter',
  //    function(err, user, info) {
  //      res.user = user;
  //      return res.redirect('/user?id=' + user.id + '&token=' + user.token);
  //    }
  //   )(req, res, next)
  //  }
  //);

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  console.log('AUTH !!!req,',req.isAuthenticated())
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the login page
  res.redirect('/login');
}