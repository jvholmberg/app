var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/admin', function (req, res, next) {
  if (!req.user ) { return res.redirect('/login'); }
  res.render('admin', {
    user: req.user
  });
});
