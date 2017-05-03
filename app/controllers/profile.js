var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  mongoose.Promise = require('bluebird');
  app.use('/', router);
};


router.get('/profile', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user) return res.redirect('/login');
  res.render('profile', {
    username: req.user.username
  });
});
