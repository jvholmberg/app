var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  passport = require('passport'),
  bcrypt = require('bcryptjs'),
  LogUtil = require('./log');

module.exports = {
  registerUser: (body, cb, ecb) => {
    if (body.password !== body.password2) {
      return ecb('Passwords does not match');
    }
    User.findOne({ username: body.username }, (err, user) => {
      if (err) {
        LogUtil.writeToLog('@fn: registerUser', err);
        return ecb('An internal error occurred');
      }
      if (user) {
        return ecb('Username is already taken');
      }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, (err, hash) => {
          if (err) {
            LogUtil.writeToLog('@fn: registerUser', err);
            return ecb('An internal error occurred');
          }
          User.create({
            username: body.username,
            password: hash
          }, (err, doc) => {
            if (err) {
              LogUtil.writeToLog('@fn: registerUser', err);
              return ecb('An internal error occurred when creating user');
            }
            return cb(doc, 'User created successfully');
          });
        });
      });
    });
  },
  getNumberOfUsers: (cb, ecb) => {
    User.count({}, (err, count) => {
      if (err) {
        LogUtil.writeToLog('@fn: getNumberOfUsers', err);
        return ecb('An internal error occurred');
      }
      return cb(count);
    });
  }
};
