var express = require('express'),
  router = express.Router(),
  UserUtil = require('../utils/user');

module.exports = function(app) {
  app.use('/', router);
};

router.post('/register', (req, res) => {
  UserUtil.register(req.body, (msg) => {
    req.flash('success', msg)
    return res.redirect('/login');
  }, (err) => {
    req.flash('error', err);
    return res.redirect('/register');
  });
});

router.get('/register', function (req, res, next) {
  if (req.user) return res.redirect('/profile');
  res.render('register', {
    error: req.flash('error'),
    url: 'register'
  });
});
