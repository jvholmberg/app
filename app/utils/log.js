var mongoose = require('mongoose'),
  Log = mongoose.model('Log');

module.exports = {

  writeToLog: (title, message) => {
    Log.create({
      title: title,
      message: message
    });
  },
  getLogs: (cb, ecb, skip, limit) => {
    Log.find({}).sort({timestamp: -1}).skip(skip).limit(limit)
    .exec((err, docs) => {
      if (err) {
        LogUtil.writeToLog('@fn: getLogs', err);
        return ecb('Error when finding logs');
      }
      return cb(docs, 'Logs fetched');
    });
  },
  getNumberOfErrors: (cb, ecb) => {
    Log.count({}, (err, count) => {
      if (err) {
        LogUtil.writeToLog('@fn: getNumberOfErrors', err);
        return ecb('An internal error occurred');
      }
      return cb(count);
    });
  }
};
