var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SessionSchema = new Schema({
  userId: Schema.Types.ObjectId,
  name: { type: String, default: '' },
  category: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now },
  exercise: [{
    name: { type: String, default: '' },
    category: { type: String, default: '' },
    data: [{
      primary: {
        value: { type: Number, default: 0 },
        unit: { type: String, default: '' }
      },
      secondary: {
        value: { type: Number, default: 0 },
        unit: { type: String, default: '' }
      }
    }]
  }]
});

SessionSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Session', SessionSchema);
