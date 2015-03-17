var mongoose = require('mongoose');
var Ninja    = mongoose.model('Ninja');
var P = require('bluebird');

// COMMON FUNCTIONS
// =============================================================================

// Define a promisified function to load a ninja
var getNinja = P.promisify(
    function(ninjaId, done){
        Ninja.findById(ninjaId, done);
    }
);

// Define a promisified function to update a ninja
var updateNinja = P.promisify(
    function(ninja, done){
        ninja.name = req.body.name;
        ninja.age = req.body.age;
        ninja.save(done);
    }
);

// Define a promisified function to remove a ninja
var removeNinja = P.promisify(
    function(ninja, done){
        ninja.remove(done);
    }
);

// CREATING NINJAS
// =============================================================================
exports.save = function(req, res, next) {

    // create a new instance of the Ninja model
    var ninja = new Ninja();

    // set the ninja name and age (comes from the request)
    ninja.name = req.body.name;
    ninja.age = req.body.age;

    // save the ninja and check for errors
    ninja.save(function(err, ninja){

        // sending the error (if any)
        if(err){
            return done(err);
        }

        //sending the response
        res.status(200).send(ninja);

    });
};

// QUERYING NINJAS
// =============================================================================
exports.query = function(req, res, next){

    // querying ninjas
    Ninja.find(function(err, ninjas){

        // sending the error (if any)
        if(err){
            return done(err);
        }

        //sending the response
        res.status(200).send(ninjas);
    });
};

// QUERYING ONE NINJA
// =============================================================================
exports.get = function(req, res, next){

    // querying ninjas
    Ninja.findById(req.params._id, function(err, ninja){

        // sending the error (if any)
        if(err){
            return done(err);
        }

        //sending the response
        res.status(200).send(ninja);
    });
};

// DELETE ONE NINJA
// =============================================================================
exports.remove = function(req, res, next){

    // deleting ninjas
    getNinja(req.params._id)                    // loading the right Ninja
    .then(removeNinja)
    .then(function(removedNinja){               
        res.status(200).send(removedNinja);     // Handling Response
    })
    .catch(function(e){
        return next(e);                         // Handling Errors
    });
};

// UPDATE ONE NINJA
// =============================================================================
exports.update = function(req, res, next){

    // create a chained Promise that update a Ninja
    getNinja(req.params._id)                    // loading the right Ninja
    .then(updateNinja)                          // Updating the right Ninja
    .then(function(updatedNinja){               
        res.status(200).send(updatedNinja);     // Handling Response
    })
    .catch(function(e){
        return next(e);                         // Handling Errors
    });
    
};