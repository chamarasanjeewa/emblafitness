
(function () {
  'use strict';
  angular.module('boadingBudgetApp').controller('LoginCtrl',LoginCtrl);
  LoginCtrl.$inject = ['$scope','$timeout','$stateParams','$state','ionicMaterialInk','registerService'];


  function LoginCtrl($scope, $timeout, $stateParams,$state, ionicMaterialInk,registerService) {
   $scope.loginError=null;
   $scope.loading=false;
   $scope.$parent.clearFabs();
   $timeout(function() {
   $scope.$parent.hideHeader();
   }, 0);
   ionicMaterialInk.displayEffect();

   $scope.signIn = function(user) {
   $scope.loading=true;

 var res=registerService.signIn(user)
   .then(function (_data) {
   $state.go('app.profile');
   $scope.loading=false;

   }, function (_error) {
   $scope.loginError="Email or password invalid or not connected to internet";
   console.log('unauthorized')
   $scope.loading=false;
   $scope.$apply()
   });

   };



   }
})();
