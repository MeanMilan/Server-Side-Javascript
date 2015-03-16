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