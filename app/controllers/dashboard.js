var express = require('express'),
  router = express.Router(),
  RecordUtil = require('../utils/record');

module.exports = function (app) {
  app.use('/', router);
};


router.get('/dashboard', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user ) { return res.redirect('/login'); }
  RecordUtil.getRecordsForUser(req.user._id,
    (msg, records) => {
      res.render('dashboard', {
        user: req.user,
        url: 'dashboard',
        exercises: records,
        success: req.flash('success', msg)
      });
    }, (err) => {
      res.render('dashboard', {
        user: req.user,
        url: 'dashboard',
        error: req.flash('error', err)
      });
    }, 0, 20);
});
