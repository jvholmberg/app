var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Diary = mongoose.model('Diary');

module.exports = function (app) {
  mongoose.Promise = require('bluebird');
  app.use('/', router);
};


router.get('/home', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user) return res.redirect('/login');

  Diary.findById(req.user.diary[0], (err, diary) => {
    if (err) {
      req.flash('error', 'An internal server error ocurred when getting diary');
    }
    res.render('home', {
      user: req.user,
      url: 'home',
      success: req.flash('success'),
      error: req.flash('error')
    });
  });
});
