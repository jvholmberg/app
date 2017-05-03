var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Exercise = mongoose.model('Exercise');

module.exports = function(app) {
  mongoose.Promise = require('bluebird');
  app.use('/api/exercise', router);
};

// This should not be used within application

// router.get('/all', function(req, res, next) {
//   Exercise.find(function(err, data) {
//     if (err) { return next(err); }
//     return res.json(data);
//   });
// });

// router.get('/search/:id', function(req, res, next) {
//   var id = req.params.id;
//
//   Exercise.findById(id, function(err, data) {
//       if (err) { return next(err); }
//       return res.json(data);
//     });
// });
//
// router.get('/search/name/:query/:skip/:limit', function(req, res, next) {
//   var query = req.params.query,
//     skip = req.params.skip !== null ? parseInt(req.params.skip) : 0,
//     limit = req.params.limit !== null ? parseInt(req.params.limit) : 25;
//
//   Exercise.find({name: { '$regex': query, '$options': 'i' }})
//     .sort({'name': -1})
//     .skip(skip)
//     .limit(limit)
//     .exec(function(err, data) {
//       if (err) { return next(err); }
//       return res.json(data);
//     });
// });
//
// router.get('/search/equipment/:query/:skip/:limit', function(req, res, next) {
//   var query = req.params.query,
//     skip = req.params.skip !== null ? parseInt(req.params.skip) : 0,
//     limit = req.params.limit !== null ? parseInt(req.params.limit) : 25;
//
//     console.log(query);
//
//   Exercise.find({ activatedMuscles: { '$regex' : query, '$options': 'i' } })
//     .sort({'name': -1})
//     .skip(skip)
//     .limit(limit)
//     .exec(function(err, data) {
//       if (err) { return next(err); }
//       return res.json(data);
//     });
// });
//
// router.get('/search/complexity/:query/:skip/:limit', function(req, res, next) {
//   var query = req.params.query,
//     skip = req.params.skip !== null ? parseInt(req.params.skip) : 0,
//     limit = req.params.limit !== null ? parseInt(req.params.limit) : 25;
//
//     console.log(query);
//
//   Exercise.find({ activatedMuscles: { '$regex' : query, '$options': 'i' } })
//     .sort({'name': -1})
//     .skip(skip)
//     .limit(limit)
//     .exec(function(err, data) {
//       if (err) { return next(err); }
//       return res.json(data);
//     });
// });
//
// router.get('/search/activated-muscles/:query/:skip/:limit', function(req, res, next) {
//   var query = req.params.query,
//     skip = req.params.skip !== null ? parseInt(req.params.skip) : 0,
//     limit = req.params.limit !== null ? parseInt(req.params.limit) : 25;
//
//     console.log(query);
//
//   Exercise.find({ activatedMuscles: { '$regex' : query, '$options': 'i' } })
//     .sort({'name': -1})
//     .skip(skip)
//     .limit(limit)
//     .exec(function(err, data) {
//       if (err) { return next(err); }
//       return res.json(data);
//     });
// });
