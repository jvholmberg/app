var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Diary = mongoose.model('Diary'),
  User = mongoose.model('User');

module.exports = function(app) {
  mongoose.Promise = require('bluebird');
  app.use('/', router);
};

router.get('/diary', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user) return res.redirect('/login');
  res.render('diary', {
    success: req.flash('success'),
    error: req.flash('error'),
    user: req.user,
    url: 'Diary'
  });
});

router.post('/diary/create', (req, res) => {
  if (!req.user) return res.redirect('/login');

  Diary.findById(req.user.diary[0], (err, diary) => {
    if (err) {
      req.flash('error', 'Exercise could not be created');
      return res.redirect('/diary');
    }
    diary.exercises.push({
      name: req.body.name,
      timestamp: req.body.date
    });
    diary.save();
    req.flash('success', 'Exercise was created successfully');
    res.redirect('/home');
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
