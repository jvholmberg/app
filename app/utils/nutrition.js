var mongoose = require('mongoose'),
  Record = mongoose.model('Record');

module.exports = {

  createNutrition: (user, data, cb, ecb) => {
    // _getRecordIfExist(data.recordId, user._id, data.timestamp,
    //   (record) => {
    //     record.nutrition.push({
    //       nutritionId: mongoose.Types.ObjectId(data.nutrionId),
    //       amount: data.amount
    //     });
    //     record.save((err) => {
    //       if (err) { ecb('Error when creating nutrition'); }
    //       return cb(record, 'Nutrition was created');
    //     });
    //   }, (err) => {
    //     return ecb(err)
    //   });
  },
  updateNutrition: (user, data, cb, ecb) => {
    // _getRecordIfExist(data.recordId, user._id, data.timestamp,
    //   (record) => {
    //     record.nutrition.push({
    //       nutritionId: mongoose.Types.ObjectId(data.nutrionId),
    //       amount: data.amount
    //     });
    //     record.save((err) => {
    //       if (err) { ecb('Error when updating nutrition'); }
    //       return cb(record, 'Nutrition was updated');
    //     });
    //   }, (err) => {
    //     return ecb(err)
    //   });
  },
  deleteNutrition: (user, data, cb, ecb) => {
    // _getRecordIfExist(data.recordId, user._id, data.timestamp,
    //   (record) => {
    //     record.nutrition.name = '';
    //     record.nutrition.category = '';
    //     record.save((err) => {
    //       if (err) { ecb('Error when deleting nutrition'); }
    //       return cb(record, 'Nutrition was deleted');
    //     });
    //   }, (err) => {
    //     return ecb(err)
    //   });
  }
  
};
