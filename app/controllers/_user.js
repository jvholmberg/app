var express = require('express'),
  router = express.Router(),
  passport = require('passport');

module.exports = function(app) {
  app.use('/user', router);
};

router.post('/register', (req, res) => {

  // Check if passwords match
  if (req.body.password !== req.body.password2) {
    req.flash('error', 'Passwords does not match');
    return res.redirect('/register');
  }

  // Check if username is taken
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      req.flash('error', 'An internal error occurred');
      return res.redirect('/register');
    }
    if (user) {
      req.flash('error', 'Username is already taken');
      return res.redirect('/register');
    }

    // Encrypt password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          req.flash('error', 'An internal error occurred');
          return res.redirect('/register');
        }

        Diary.create({
          user: req.body.username
        }, (err, diary) => {
          if (err) {
            req.flash('error', 'An internal error occurred when creating diary');
            return res.redirect('/register');
          }
          User.create({
            username: req.body.username,
            password: hash,
            diary: [diary._id]
          }, (err, user) => {
            if (err) {
              req.flash('error', 'An internal error occurred when creating user');
              return res.redirect('/register');
            }
            req.flash('success', 'User created successfully');
            return res.redirect('login');
          });
        });
      });
    });
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
