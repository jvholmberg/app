var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  bcrypt = require('bcryptjs');

module.exports = {
  registerUser: (body, cb, ecb) => {
    // Check if passwords match
    if (body.password !== body.password2) {
      return ecb('Passwords does not match');
    }

    // Check if username is taken
    User.findOne({ username: body.username }, (err, user) => {
      if (err) {
        return ecb('An internal error occurred');
      }
      if (user) {
        return ecb('Username is already taken');
      }

      // Encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) {
            return ecb('An internal error occurred');
          }
          User.create({
            username: body.username,
            password: hash
          }, (err, user) => {
            if (err) {
              return ecb('An internal error occurred when creating user');
            }
            return cb('User created successfully');
          });
        });
      });
    });
  }
};
