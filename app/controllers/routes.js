var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  UserUtil = require('../utils/user'),
  RecordUtil = require('../utils/record'),
  CategoryUtil = require('../utils/category'),
  LogUtil = require('../utils/log');

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
* @fn: Dashboard, Session, Weight (User restricted)
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
  if (!req.user) return res.redirect('/login');
  CategoryUtil.getCategories((docs, msg) => {
    console.log();
    res.render('session', {
      user: req.user,
      success: req.flash('success'),
      error: req.flash('error'),
      categories: docs,
      url: 'Session'
    });
  }, (err) => {
    req.flash('error', err);
    res.render('session', {
      user: req.user,
      success: req.flash('success'),
      error: req.flash('error'),
      categories: JSON.stringify(docs),
      url: 'Session'
    });
  });
});
router.get('/session/update/:sessionId', function (req, res, next) {
  if (!req.user) return res.redirect('/login');
  CategoryUtil.getCategories((docs, msg) => {
    res.render('session', {
      user: req.user,
      success: req.flash('success'),
      error: req.flash('error'),
      categories: docs,
      url: 'Session'
    });
  }, (err) => {
    req.flash('error', err);
    res.render('session', {
      user: req.user,
      success: req.flash('success'),
      error: req.flash('error'),
      categories: docs,
      url: 'Session'
    });
  });
});
router.get('/weight/create/:recordId', function (req, res, next) {
  if (!req.user) return res.redirect('/login');
  res.render('weight', {
    user: req.user,
    success: req.flash('success'),
    error: req.flash('error'),
    url: 'Weight'
  });
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
  getDataForAdmin(null, null, null, null, (users, records, categories, nrLogs) => {
    LogUtil.getLogs((logs, msg) => {
      res.render('admin', {
        user: req.user,
        users: users,
        records: records,
        categories: categories,
        nrLogs: nrLogs,
        logs: logs
      });
    }, (err) => {
      req.flash('error', err);
      res.render('admin', {
        user: req.user,
        error: req.flash('error')
      });
    }, 0, 25)
  }, (err) => {
    req.flash('error', err);
    res.render('admin', {
      user: req.user,
      error: req.flash('error')
    });
  })
});
function getDataForAdmin(users, records, categories, logs, cb, ecb) {
  if (users === null) {
    UserUtil.getNumberOfUsers((count) => {
      users = count;
      return getDataForAdmin(users, records, categories, logs, cb, ecb);
    }, (err) => { return ecb(err); });
  } else if (records === null) {
    RecordUtil.getNumberOfRecords((count) => {
      records = count;
      return getDataForAdmin(users, records, categories, logs, cb, ecb);
    }, (err) => { return ecb(err); });
  } else if (categories === null) {
    CategoryUtil.getNumberOfCategories((count) => {
      categories = count;
      return getDataForAdmin(users, records, categories, logs, cb, ecb);
    }, (err) => { return ecb(err); });
  } else if (logs === null) {
    LogUtil.getNumberOfErrors((count) => {
      logs = count;
      return getDataForAdmin(users, records, categories, logs, cb, ecb);
    }, (err) => { return ecb(err); });
  }else {
    return cb(users, records, categories, logs);
  }
}
