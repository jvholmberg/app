var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  RecordUtil = require('../utils/record'),
  CategoryUtil = require('../utils/category');

module.exports = function (app) {
  app.use('/', router);
};

/*
* @fn: Index (Not restricted)
*/
router.get('/', function (req, res, next) {
  res.render('index', {
    user: req.user
  });
});

/*
* @fn: Dashboard (User restricted)
*/
router.get('/dashboard', function (req, res, next) {
  if (!req.user ) { return res.redirect('/login'); }

  RecordUtil.getRecordsForUser(req.user._id,
    (docs, msg) => {
      res.render('dashboard', {
        user: req.user,
        url: 'dashboard',
        records: docs,
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
router.get('/session', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user) return res.redirect('/login');
  CategoryUtil.getCategories((docs, msg) => {
    res.render('session', {
      success: req.flash('success'),
      error: req.flash('error'),
      categories: docs,
      url: 'Session'
    });
  }, () => {

  })
});
router.get('/session/edit/:sessionId', function (req, res, next) {
  // If user is NOT logged in redirect to login
  if (!req.user) return res.redirect('/login');
  CategoryUtil.getCategories((docs, msg) => {
    res.render('session', {
      success: req.flash('success'),
      error: req.flash('error'),
      categories: docs,
      url: 'Session'
    });
  }, () => {

  })
});

/*
* @fn: Register, Login, Logout
*/
router.get('/register', function (req, res, next) {
  if (req.user) return res.redirect('/profile');
  res.render('register', {
    error: req.flash('error'),
    url: 'register'
  });
});
router.get('/login', function (req, res, next) {
  // If user is logged in redirect to profile
  if (req.user) return res.redirect('/profile');
  res.render('login', {
    success: req.flash('success'),
    error: req.flash('error'),
    url: 'login'
  });
});

/*
* @fn: Admin (Admin restricted)
*/
router.get('/admin', function (req, res, next) {
  if (!req.user ) { return res.redirect('/login'); }
  res.render('admin', {
    user: req.user
  });
});
