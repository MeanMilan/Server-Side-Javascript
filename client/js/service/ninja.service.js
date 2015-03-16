angular.module('handlingNinja')
.service('Ninja',function($resource){
    var Ninja = $resource('http://127.0.0.1:3000/api/ninja/:_id',{_id: '@_id'});
    return Ninja;
});