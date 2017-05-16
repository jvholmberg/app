var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  RecordUtil = require('../utils/record');

module.exports = function (app) {
  app.use('/', router);
  RecordUtil.createWeight();
};

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
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
