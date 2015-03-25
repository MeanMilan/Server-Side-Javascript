var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var io = require('../server');

var NinjaSchema   = new Schema({
    name: String,
    age: Number
});

NinjaSchema.plugin(require('mongoose-eventful'));

module.exports = mongoose.model('Ninja', NinjaSchema);
