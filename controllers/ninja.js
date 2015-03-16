var mongoose = require('mongoose');
var Ninja    = mongoose.model('Ninja');

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
            return next(err);
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
            return next(err);
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
            return next(err);
        }

        //sending the response
        res.status(200).send(ninja);
    });
};

// DELETE ONE NINJA
// =============================================================================
exports.remove = function(req, res, next){

    // querying ninjas
    Ninja.remove({_id : req.params._id}, function(err, ninja){

        // sending the error (if any)
        if(err){
            return next(err);
        }

        //sending the response
        res.status(200).send({message : 'Successfully Deleted Ninja with id: ' + req.params._id});
    });
};

// UPDATE ONE NINJA
// =============================================================================
exports.update = function(req, res, next){

    // loading the right Ninja
    Ninja.findById(req.params._id, function(err, ninja){
        if(err){
            return next(err);
        }

        // set the new ninja name and age (comes from the request)
        ninja.name = req.body.name;
        ninja.age = req.body.age;

        //saving the new Ninja
        ninja.save(function(err, ninja){
            if(err){
                return next(err);
            }

            // NOTE that the CallbackHell has started!
            // To avoid this please check out some FP Libraries (Bluebird, Async, FunctionalJs)

            res.status(200).send(ninja);
        });
    });
    
};

// cleanUpdate (Just an example, not attached to any route)
// =============================================================================
var P = require('bluebird');
exports.updateFair = function(req, res, next){
    
    // NOTE that this can seem more complex,
    // but it is cleaner and easy to mantain.
    // You cal also define the `getNinja` and `updateNinja` as method of this controller and user them in every route.
    // This functions can also be defined in a `common` utility file and shared trough models and controllers.

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
            console.log(ninja);
            ninja.save(done);
        }
    );

    // create a chained Promise that update a Ninja
    getNinja(req.params._id)
    .then(updateNinja)
    .then(function(updatedNinja){
        res.status(200).send(updatedNinja);
    })
    .catch(function(e){
        return next(e);
    });

};