// Handling Ninja
// ==============
//
// This is NOT a good example of Angular Development
// It has been developed in short time just to have a client for the NodeJs application, that is the real scope of the Talk

angular.module('handlingNinja', ['ngResource'])
    .service('Ninja',function($resource){
        var Ninja = $resource('http://127.0.0.1:3000/api/ninja/:_id',{_id: '@_id'});
        return Ninja;
    })
    .controller('NinjaCtrl', function($scope, Ninja){

        $scope.ninjas = [];

        $scope.detail = null;

        $scope.loadNinja = function(){
            $scope.ninjas = Ninja.query();
        };

        $scope.newNinja = {name: null, age: null};

        $scope.createNinja = function(){
            var ninja = new Ninja($scope.newNinja);

            ninja.$save().then(function(res){
                $scope.newNinja = {name: null, age: null};
                $scope.loadNinja();
            });
        };

        $scope.getNinja = function(_id){
            Ninja.get({_id: _id}).$promise.then(function(ninja){
                $scope.ninja = ninja;
                $scope.detail = true;
            });
        };

        $scope.updateNinja = function(){
            $scope.ninja.$save().then(function(res){
                $scope.detail = null;
                $scope.loadNinja();
            });
        };

        $scope.deleteNinja = function(ninja){
            ninja.$remove().then(function(res){
                $scope.loadNinja();
            });
        };

        $scope.loadNinja();
    });