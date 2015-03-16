'use strict';

process.env.NODE_ENV = 'test';

var expect = require("chai").expect;
var app = require('../server.js');
var request = require('superagent');

describe('Realtime Ninja', function(){

	before(function(done){

        if(app.ready){

            return done();
        }

        app.app.on('app.ready',function(){ done(); });
    });

	it('should be available at endpoint /api', function(done){
		request
			.get('http://localhost:4000/api')
			.end(function(res){
				expect(res.status).to.equal(200);
				done();
			});
	});
});

describe('The application', function(){

	var ninjaHelper = require('./ninjaHelper');
	var _ninja;

	before(function(done){

        if(app.ready){

            return done();
        }

        app.app.on('app.ready',function(){ done(); });
    });

    beforeEach(function(done){
    	ninjaHelper.nuke()
    	.then(function(){
    		return ninjaHelper.insert();
    	})
    	.then(function(ninja){
    		_ninja = ninja;
    		done();
    	});
    });

	it('should create a ninja', function(done){

		var ninja = {
			name: 'testNinja',
			age: 42
		};

		request
			.post('http://localhost:4000/api/ninja')
			.send(ninja)
			.end(function(res){
				expect(res.body._id).to.be.ok;
				expect(res.body.age).to.equal(ninja.age);
				expect(res.body.name).to.equal(ninja.name);
				done();
			});
	});

	it('shoul query ninjas', function(done){
		request
			.get('http://localhost:4000/api/ninja')
			.end(function(res){
				expect(res.body.length).to.equal(1);
				expect(res.body[0].name).to.equal(_ninja.name);
				expect(res.body[0].age).to.equal(_ninja.age);
				done();
			});
	});

	it('should get a ninja', function(done){
		request
			.get('http://localhost:4000/api/ninja/'+_ninja._id)
			.end(function(res){
				expect(res.body.name).to.equal(_ninja.name);
				expect(res.body.age).to.equal(_ninja.age);
				done();
			})
	});
});