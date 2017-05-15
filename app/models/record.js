var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RecordSchema = new Schema({
  userId: Schema.Types.ObjectId,
  timestamp: { type: Date, default: Date.now },
  session: {
    name: { type: String, default: '' },
    category: { type: String, default: '' },
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
  },
  nutrition: [{
    name: { type: String, default: '' },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 }
  }]

});

RecordSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Record', RecordSchema);
