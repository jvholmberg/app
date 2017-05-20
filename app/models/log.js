var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LogSchema = new Schema({
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
});

LogSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Log', LogSchema);
