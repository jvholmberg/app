var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function (app) {
  mongoose.Promise = require('bluebird');
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  res.render('index', {

  });
});
