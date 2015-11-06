module.exports = {
  isLoggedIn: isLoggedIn,
  checkCookie: checkCookie
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  console.log('AUTH !!!req,',req.isAuthenticated())
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the login page
  res.redirect('/login');
}

function checkCookie(req, res, next){

  console.log('-----',req.isAuthenticated())
  if (!req.isAuthenticated()) {
    console.log('-----1222')
    return  res.status(401).send('Unauthorized');
  }

  next();

}