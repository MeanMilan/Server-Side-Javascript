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
    
    // NEVER ninja = res.body

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