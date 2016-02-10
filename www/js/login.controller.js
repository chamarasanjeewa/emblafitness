
(function () {
  'use strict';
  angular.module('boadingBudgetApp').controller('LoginCtrl',LoginCtrl);
  LoginCtrl.$inject = ['$scope','$timeout','$stateParams','$state','ionicMaterialInk','registerService','$firebaseSimpleLogin'];


  function LoginCtrl($scope, $timeout, $stateParams,$state, ionicMaterialInk,registerService,$firebaseSimpleLogin) {
   $scope.loginError=null;
   $scope.loading=false;
   $scope.$parent.clearFabs();
   $timeout(function() {
   $scope.$parent.hideHeader();
   }, 0);
   ionicMaterialInk.displayEffect();

   $scope.signIn = function(user) {
   $scope.loading=true;

var firebaseObj = new Firebase("blistering-torch-9435.firebaseio.com"); 
        var loginObj = $firebaseSimpleLogin(firebaseObj);

        debugger;

         loginObj.$login('password', {
            email: 'chamara.sanjeewa@gmail.com',
            password: 'sanjusanju'
        })
        .then(function(user) {
            // Success callback
            console.log('Authentication successful');
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
        });



   /*registerService.init();
   registerService.signIn(user)
   .then(function (_data) {
   $state.go('app.profile');
   $scope.loading=false;

   }, function (_error) {
   $scope.loginError="User name or password invalid or not connected to internet";
   console.log('unauthorized')
   $scope.loading=false;
   $scope.$apply()
   });*/

   };



   }
})();
