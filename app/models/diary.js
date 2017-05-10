var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var DiarySchema = new Schema({
  user: { type: String, default: '' },
  exercises: [{
    name: { type: String, default: '' },
    timestamp: { type: Date, default: Date.now }
  }]
});

DiarySchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Diary', DiarySchema);
