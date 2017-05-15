var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Session = mongoose.model('Session');

module.exports = {
  getSessionById: (userId, next, stop) => {
    Session.findOne({
      userId: userId
    }, (err, session) => {
      if (err) { stop('An error ocurred when finding session'); }
      next(session);
    });
  },

  getSessionsForUser: (userId, next, stop, skip, limit) => {
    Session.find({
      userId: userId
    }).sort({timestamp: -1}).skip(skip).limit(limit)
    .exec((err, sessions) => {
      if (err) { stop('Error when finding sessions'); }
      next(sessions);
    });
  },

  createSession: (data, next, stop) => {

    if (!data.userId) {
      return stop('Invalid User');
    }
    if (!data.name) {
      return stop('Name is not allowed to be empty');
    }
    if (!data.timestamp) {
      return stop('Date is not allowed to be empty');
    }

    Session.create({
      userId: mongoose.Types.ObjectId(data.userId),
      name: data.name,
      category: data.category,
      timestamp: data.timestamp,
      exercises: data.exercises
    }, (err, session) => {
      if (err) { stop('An error ocurred when creating session'); }
      next(session, 'Sessions loaded');
    });
  }
};
