var express = require('express'),
  router = express.Router(),
  SessionUtil = require('../utils/session'),
  CategoryUtil = require('../utils/category');

module.exports = function(app) {
  app.use('/', router);
};

router.get('/session', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user) return res.redirect('/login');
  CategoryUtil.getCategories((categories) => {
    res.render('session', {
      success: req.flash('success'),
      error: req.flash('error'),
      categories: categories,
      url: 'Session'
    });
  }, () => {

  })

});

router.post('/session/create', (req, res) => {
  if (!req.user) return res.redirect('/login');
  var data = {
    userId: req.user._id,
    category: req.body.category,
    name: req.body.name,
    timestamp: req.body.date
  };
  SessionUtil.createSession(data, (session) => {
    res.redirect('/dashboard')
  }, (err) => {
    res.redirect('/session');
  });
});


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