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
    if (err) { return ecb('Error when searching for record'); }
    if (record === null) {
      Record.create({
        userId: mongoose.Types.ObjectId(userId),
        timestamp: timestamp
      }, (err, record) => {
        if (err) { return ecb('Error when creating record'); }
        return cb(record);
      });
    } else { return cb(record); }
  });
}

module.exports = {

  getRecordsForUser: (userId, cb, ecb, skip, limit) => {
    Record.find({
      userId: userId
    }).sort({timestamp: -1}).skip(skip).limit(limit)
    .exec((err, records) => {
      if (err) { return ecb('Error when finding records'); }
      console.log(records);
      return cb(records, 'Records for users fetched');
    });
  },

  createWeight: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.weight = data.weight;
        record.save((err) => {
          if (err) { ecb('Error when creating weight'); }
          return cb(record, 'Weight was created');
        });
      }, (err) => {
        return ecb(err);
      });
  },
  updateWeight: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.weight = data.weight;
        record.save((err) => {
          if (err) { ecb('Error when updating weight'); }
          return cb(record, 'Weight was updated');
        });
      }, (err) => {
        return ecb(err)
      });
  },
  deleteWeight: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.weight = 0;
        record.save((err) => {
          if (err) { ecb('Error when deleting weight'); }
          return cb(record, 'Weight was deleted');
        });
      }, (err) => {
        return ecb(err)
      });
  },

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
      if (err) { ecb('Error: Could not create session'); }
      cb(doc, 'Session was created');
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
      if (err) { ecb('Error: Could not create session'); }
      cb(doc, 'Session was created');
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
      if (err) { ecb('Error: Could not delete session'); }
      cb(doc, 'Session was deleted');
    });
  },

  createNutrition: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.nutrition.push({
          nutritionId: mongoose.Types.ObjectId(data.nutrionId),
          amount: data.amount
        });
        record.save((err) => {
          if (err) { ecb('Error when creating nutrition'); }
          return cb(record, 'Nutrition was created');
        });
      }, (err) => {
        return ecb(err)
      });
  },
  updateNutrition: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.nutrition.push({
          nutritionId: mongoose.Types.ObjectId(data.nutrionId),
          amount: data.amount
        });
        record.save((err) => {
          if (err) { ecb('Error when updating nutrition'); }
          return cb(record, 'Nutrition was updated');
        });
      }, (err) => {
        return ecb(err)
      });
  },
  deleteNutrition: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.nutrition.name = '';
        record.nutrition.category = '';
        record.save((err) => {
          if (err) { ecb('Error when deleting nutrition'); }
          return cb(record, 'Nutrition was deleted');
        });
      }, (err) => {
        return ecb(err)
      });
  },
};
