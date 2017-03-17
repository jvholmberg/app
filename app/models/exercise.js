var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
  name: String,
  equipment: [String],
  complexity: String,
  activatedMuscles: [String],
  text: String
});

ExerciseSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Exercise', ExerciseSchema);
