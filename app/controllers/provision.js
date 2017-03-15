var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Provision = mongoose.model('Provision');

module.exports = function(app) {
  app.use('/api/provision', router);
};

router.get('/all', function(req, res, next) {
  Provision.find(function(err, data) {
    if (err)
      return next(err);
    return res.json(data);
  });
});
router.get('/search/:query', function(req, res, next) {
  Provision.find({
    name: { '$regex': req.params.query, "$options": "i" }
  }, function(err, data) {
    if (err)
      return next(err);
    return res.json(data);
  });
});
