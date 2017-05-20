var mongoose = require('mongoose'),
  Record = mongoose.model('Record'),
  LogUtil = require('./log');

module.exports = {

  createSession: (user, data, cb, ecb) => {
    var query = {}, update = {}, options = {};

    // Determine params to be used for seach
    if (data['recordId'] !== undefined) { query['_id'] = data.recordId; }
    else if (user['_id'] !== undefined && data['timestamp'] !== undefined) {
      query['userId'] = user._id;
      query['timestamp'] = data.timestamp;
    } else {
      return ecb('Error: Invalid params');
    }

    // Determine update of record
    if (data.name !== undefined && data.category !== undefined) {
      update = { '$push': {
        'session': { 'name': data.name, 'category': data.category }
      }};
    } else {
      return ecb('Error: Invalid data provided');
    }

    // Determine options
    options['upsert'] = true;
    options['new'] = true;

    // Create session in db
    Record.findOneAndUpdate(query, update, options, (err, doc) => {
      if (err) {
        LogUtil.writeToLog('@fn: createSession', err);
        return ecb('Error: Could not create session');
      }
      return cb(doc, 'Session was created');
    });
  },
  updateSession: (user, data, cb, ecb) => {
    var query = {}, update = {}, options = {};

    // Determine params to be used for seach
    if (data['recordId'] !== undefined && data['sessionId'] !== undefined) {
      query['_id'] = data.recordId;
      query['session._id'] = data.sessionId;
    } else if (user['_id'] !== undefined && data['timestamp'] !== undefined && data['sessionId'] !== undefined) {
      query['userId'] = user._id;
      query['timestamp'] = data.timestamp;
      query['session._id'] = data.sessionId;
    } else {
      return ecb('Error: Invalid params');
    }

    // Determine update of record
    if (data.name !== undefined && data.category !== undefined) {
      update = { '$set': {
        'session': { 'name': data.name, 'category': data.category }
      }};
    } else {
      return ecb('Error: Invalid data provided');
    }

    // Determine options
    options['upsert'] = true;
    options['new'] = true;

    // Create session in db
    Record.findOneAndUpdate(query, update, options, (err, doc) => {
      if (err) {
        LogUtil.writeToLog('@fn: updateSession', err);
        return ecb('Error: Could not create session');
      }
      return cb(doc, 'Session was created');
    });
  },
  deleteSession: (user, data, cb, ecb) => {
    var query = {}, update = {}, options = {};

    // Determine params to be used for seach
    if (data['recordId'] !== undefined) { query['_id'] = data.recordId; }
    else if (user['_id'] !== undefined && data['timestamp'] !== undefined) {
      query['userId'] = user._id;
      query['timestamp'] = data.timestamp;
    } else {
      return ecb('Error: Invalid params');
    }

    // Determine update of record
    if (data.sessionId !== undefined) {
      update = { '$pull': {
        'session': { '_id': data.sessionId }
      }};
    } else {
      return ecb('Error: Invalid data provided');
    }

    // Determine options
    options['safe'] = true;

    // Create session in db
    Record.findOneAndUpdate(query, update, options, (err, doc) => {
      if (err) {
        LogUtil.writeToLog('@fn: deleteSession', err);
        return ecb('Error: Could not delete session');
      }
      return cb(doc, 'Session was deleted');
    });
  }

};
