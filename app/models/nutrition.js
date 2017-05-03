var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var NutritionSchema = new Schema({
  name: String
});

NutritionSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Nutrition', NutritionSchema);
