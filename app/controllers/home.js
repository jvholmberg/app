var express = require('express'),
  router = express.Router(),
  SessionUtil = require('../utils/session');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/home', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user) return res.redirect('/login');

  SessionUtil.getSessionsForUser(req.user._id,
    (sessions) => {
      res.render('home', {
        user: req.user,
        url: 'home',
        exercises: sessions,
        success: req.flash('success')
      });
    }, (err) => {
      res.render('home', {
        user: req.user,
        url: 'home',
        error: req.flash('error')
      });
    }, 0, 100);

});
