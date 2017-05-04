var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport');

module.exports = function (app) {
  mongoose.Promise = require('bluebird');
  app.use('/', router);
};

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/login', function (req, res, next) {
  // If user is logged in redirect to profile
  if (req.user) return res.redirect('/profile');
  res.render('login', {
    success: req.flash('success'),
    error: req.flash('error'),
    url: 'login'
  });
});
