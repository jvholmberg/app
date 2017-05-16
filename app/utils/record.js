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

  createWeight: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.weight = data.weight;
        record.save((err) => {
          if (err) { ecb('Error when creating weight'); }
          return cb('Weight was created');
        });
      }, (err) => {
        return ecb(err)
      });
  },
  updateWeight: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.weight = data.weight;
        record.save((err) => {
          if (err) { ecb('Error when updating weight'); }
          return cb('Weight was updated');
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
          return cb('Weight was deleted');
        });
      }, (err) => {
        return ecb(err)
      });
  },

  createSession: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.session.name = data.name;
        record.session.category = data.category;
        record.save((err) => {
          if (err) { ecb('Error when creating session'); }
          return cb('Session was created');
        });
      }, (err) => {
        return ecb(err)
      });
  },
  updateSession: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.session.name = data.name;
        record.session.category = data.category;
        record.save((err) => {
          if (err) { ecb('Error when updating session'); }
          return cb('Session was updated');
        });
      }, (err) => {
        return ecb(err)
      });
  },
  deleteSession: (user, data, cb, ecb) => {
    _getRecordIfExist(data.recordId, user._id, data.timestamp,
      (record) => {
        record.session.name = '';
        record.session.category = '';
        record.save((err) => {
          if (err) { ecb('Error when deleting session'); }
          return cb('Session was deleted');
        });
      }, (err) => {
        return ecb(err)
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
          return cb('Nutrition was created');
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
          return cb('Nutrition was updated');
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
          return cb('Nutrition was deleted');
        });
      }, (err) => {
        return ecb(err)
      });
  },
};
