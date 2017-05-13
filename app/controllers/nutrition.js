var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Nutrition = mongoose.model('Nutrition');

module.exports = function(app) {
  app.use('/api/nutrition', router);
};

// This should not be used within application

// router.get('/all', function(req, res, next) {
//   Provision.find(function(err, data) {
//     if (err) { return next(err); }
//     return res.json(data);
//   });
// });

// router.get('/search/:id', function(req, res, next) {
//   var id = req.params.id;
//
//   Provision.findById(id, function(err, data) {
//       if (err) { return next(err); }
//       return res.json(data);
//     });
// });
//
// router.get('/search/:query/:skip/:limit', function(req, res, next) {
//   var query = req.params.query,
//     skip = req.params.skip !== null ? parseInt(req.params.skip) : 0,
//     limit = req.params.limit !== null ? parseInt(req.params.limit) : 25
//
//   Provision.find({name: { '$regex': query, '$options': 'i' }})
//     .sort({'name': -1})
//     .skip(skip)
//     .limit(limit)
//     .exec(function(err, data) {
//       if (err) { return next(err); }
//       return res.json(data);
//     });
// });
