var express = require('express'),
  router = express.Router(),
  passport = require('passport'),
  UserUtil = require('../utils/user');

module.exports = function(app) {
  app.use('/user', router);
};

router.post('/register', (req, res) => {
  UserUtil.registerUser((doc, msg) => {

  }, (err) => {

  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/logout', (req, res) => {
  req.logout();
  return res.redirect('/');
});
