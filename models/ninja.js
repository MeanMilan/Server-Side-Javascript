var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var NinjaSchema   = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Ninja', NinjaSchema);