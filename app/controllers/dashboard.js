var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/dashboard', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user ) { return res.redirect('/login'); }
  if (req.user.username != 'johan.holmberg123@hotmail.com' ) {
    return res.redirect('/profile');
  }
  res.render('dashboard', {
    user: req.user,
    url: 'dashboard'
  });
});
