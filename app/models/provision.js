// Example model

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ProvisionSchema = new Schema({

});

ProvisionSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Provision', ProvisionSchema);
