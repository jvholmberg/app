var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: { type: String, default: '' },
  primaryUnit: { type: String, default: '' },
  secondaryUnit: { type: String, default: '' }
});

CategorySchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Category', CategorySchema);
