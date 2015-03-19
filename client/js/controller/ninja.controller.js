'use strict';

angular.module('handlingNinja')
    .controller('NinjaCtrl', function($scope, Ninja, mySocket, _){

        // LISTEN TO SOCKET.IO EVENTS
        // ==========================
        mySocket.on('connected',function(data){
            console.info(data);
        });

        mySocket.on('created', function(ninja){
            $scope.ninjas.push(new Ninja(ninja));
        });

        mySocket.on('deleted', function(ninja){
            _.remove($scope.ninjas, {_id: ninja._id});
        });

        mySocket.on('changed', function(ninja){
            var id = _.findIndex($scope.ninjas, {_id: ninja._id});
            $scope.ninjas[id] = new Ninja(ninja);
        });

        // CRUD FUNCTIONS
        // ==========================

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
            ninja.$remove();
        };

        $scope.loadNinja();
    });