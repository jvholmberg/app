var express = require('express'),
  router = express.Router(),
  SessionUtil = require('../utils/session');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/dashboard', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user ) { return res.redirect('/login'); }
  SessionUtil.getSessionsForUser(req.user._id,
    (sessions, msg) => {
      res.render('dashboard', {
        user: req.user,
        url: 'dashboard',
        exercises: sessions,
        success: req.flash('success', msg)
      });
    }, (err) => {
      res.render('dashboard', {
        user: req.user,
        url: 'dashboard',
        error: req.flash('error', err)
      });
    }, 0, 100);
});
