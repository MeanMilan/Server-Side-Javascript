'use strict';

var mongoose = require('mongoose');
require('../models/ninja');
var Ninja = mongoose.model('Ninja');
var P = require('bluebird');

var testNinja = {
	name: 'testNinja',
	age: 42
};

exports.ninja = testNinja;

exports.nuke = P.promisify(function(done){
	Ninja.remove({},done);
});

exports.insert = P.promisify(function(done){
	var ninja = new Ninja(testNinja);
	ninja.save(function(err, doc){
		done(null, doc);
	});
});