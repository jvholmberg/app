var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProvisionSchema = new Schema({
  name: String,
  monounsaturatedFat: { name: String, value: String, unit: String },
  polyunsaturatedFat: { name: String, value: String, unit: String },
  saturatedFat: { name: String, value: String, unit: String },
  vitamin: { name: String, value: String, unit: String },
  carbohydrates: { name: String, value: String, unit: String },
  fat: { name: String, value: String, unit: String },
  protein: { name: String, value: String, unit: String },
  fiber: { name: String, value: String, unit: String },
  water: { name: String, value: String, unit: String },
  alcohol: { name: String, value: String, unit: String },
  ash: { name: String, value: String, unit: String },
  monosaccharides: { name: String, value: String, unit: String },
  disaccharides: { name: String, value: String, unit: String },
  sucrose: { name: String, value: String, unit: String },
  wholeGrain: { name: String, value: String, unit: String },
  sugar: { name: String, value: String, unit: String },
  cholesterol: { name: String, value: String, unit: String },
  phosphorus: { name: String, value: String, unit: String },
  iodine: { name: String, value: String, unit: String },
  iron: { name: String, value: String, unit: String },
  calcium: { name: String, value: String, unit: String },
  potassium: { name: String, value: String, unit: String },
  magnesium: { name: String, value: String, unit: String },
  sodium: { name: String, value: String, unit: String },
  salt: { name: String, value: String, unit: String },
  selenium: { name: String, value: String, unit: String },
  zinc: { name: String, value: String, unit: String },
  copper: { name: String, value: String, unit: String }
});

ProvisionSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Provision', ProvisionSchema);
