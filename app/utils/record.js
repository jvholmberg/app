var mongoose = require('mongoose'),
  Record = mongoose.model('Record');

function _getRecordIfExist(recordId, userId, timestamp, cb, ecb) {
  if (recordId === null && (userId === null && timestamp === null)) {
    return ecb('No parameters given when finding record');
  }
  Record.findOne(recordId === null ? {
    _id: recordId
  } : {
    userId: userId,
    timestamp: timestamp
  }, (err, record) => {
    if (err) { return ecb('Internal error when searching for record'); }
    if (record === null) {
      Record.create({
        userId: mongoose.Types.ObjectId(userId),
        timestamp: timestamp
      }, (err, record) => {
        if (err) { return ecb('Internal error when creating record'); }
        return cb(record);
      });
    } else { return cb(record); }
  });
}

module.exports = {

  createWeight: (user, data, cb, ecb) => {

  },
  updateWeight: (user, data, cb, ecb) => {

  },
  deleteWeight: (user, data, cb, ecb) => {

  },

  createSession: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.session.name = data.name;
        record.session.category = data.category;
        record.save((err) => {
          if (err) { ecb('Session could not be saved'); }
          return cb('Session has been created');
        });
      }, (err) => {
        return ecb(err)
      });
  },
  updateSession: (user, data, cb, ecb) => {

  },
  deleteSession: (user, data, cb, ecb) => {

  },

  createNutrition: (user, data, cb, ecb) => {

  },
  updateNutrition: (user, data, cb, ecb) => {

  },
  deleteNutrition: (user, data, cb, ecb) => {

  },
};
