var mongoose = require('mongoose'),
  Record = mongoose.model('Record');

module.exports = {

  getRecordsForUser: (userId, cb, ecb, skip, limit) => {
    Record.find({
      userId: userId
    }).sort({timestamp: -1}).skip(skip).limit(limit)
    .exec((err, records) => {
      if (err) { return ecb('Error when finding records'); }
      return cb(records, 'Records for users fetched');
    });
  },
  getNumberOfRecords: (cb, ecb) => {
    Record.count({}, (err, count) => {
      if (err) { return ecb('An internal error occurred'); }
      return cb(count);
    });
  }
};
