var mongoose = require('mongoose'),
  Record = mongoose.model('Record'),
  LogUtil = require('./log');

module.exports = {

  createWeight: (user, data, cb, ecb) => {
    var query = {}, update = {}, options = {};

    // Set params to be used for seach
    if (data['recordId'] !== undefined) { query['_id'] = data.recordId; }
    else if (user['_id'] !== undefined && data['timestamp'] !== undefined) {
      query['userId'] = user._id;
      query['timestamp'] = data.timestamp;
    } else {
      return ecb('Error: Invalid params');
    }

    // Determine update of record
    if (data.weight !== undefined) {
      update = { 'weight': data.weight};
    } else {
      return ecb('Error: Invalid data provided');
    }

    // Determine options
    options['upsert'] = true;
    options['new'] = true;

    // Create session in db
    Record.findOneAndUpdate(query, update, options, (err, doc) => {
      if (err) {
        LogUtil.writeToLog('@fn: createWeight', err);
        return ecb('Error: Could not create weight');
      }
      cb(doc, 'Weight was created');
    });
  },
  updateWeight: (user, data, cb, ecb) => {
    // _getRecordIfExist(data.recordId, user._id, data.timestamp,
    //   (record) => {
    //     record.weight = data.weight;
    //     record.save((err) => {
    //       if (err) { ecb('Error when updating weight'); }
    //       return cb(record, 'Weight was updated');
    //     });
    //   }, (err) => {
    //     return ecb(err)
    //   });
  },
  deleteWeight: (user, data, cb, ecb) => {
    // _getRecordIfExist(data.recordId, user._id, data.timestamp,
    //   (record) => {
    //     record.weight = 0;
    //     record.save((err) => {
    //       if (err) { ecb('Error when deleting weight'); }
    //       return cb(record, 'Weight was deleted');
    //     });
    //   }, (err) => {
    //     return ecb(err)
    //   });
  }

};
