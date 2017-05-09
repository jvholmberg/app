var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
  name: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
});

ExerciseSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Exercise', ExerciseSchema);
