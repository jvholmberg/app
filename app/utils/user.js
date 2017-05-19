var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  bcrypt = require('bcryptjs');

module.exports = {
  registerUser: (body, next, stop) => {
    // Check if passwords match
    if (body.password !== body.password2) {
      return stop('Passwords does not match');
    }

    // Check if username is taken
    User.findOne({ username: body.username }, (err, user) => {
      if (err) {
        return stop('An internal error occurred');
      }
      if (user) {
        return stop('Username is already taken');
      }

      // Encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) {
            return stop('An internal error occurred');
          }
          User.create({
            username: body.username,
            password: hash
          }, (err, user) => {
            if (err) {
              return stop('An internal error occurred when creating user');
            }
            return next('User created successfully');
          });
        });
      });
    });
  }
};
