
(function () {
  'use strict';
  angular.module('boadingBudgetApp').controller('RegisterCtrl',RegisterCtrl);
  RegisterCtrl.$inject = ['$scope','$timeout','$state','registerService'];

  function RegisterCtrl($scope,$timeout, $state,registerService) {
    $scope.loading=false;

    $scope.register = function(user) {
      $scope.loading=true;

      $timeout(function() {
        $scope.$parent.hideHeader();
      },0);

      registerService.register(user).then(function(data){
             
        $scope.loading=false;
        $state.go('app.login');

      }, function (_error) {
        if(_error.code=='EMAIL_TAKEN'){
         $scope.registrationError="The specified email address is already in use";

        }
   console.log('unauthorized')
   $scope.loading=false;
   $scope.$apply()

   });
     /* , function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {

          console.log("Successfully created user account with uid:", userData.uid);
        }*/

/*
      .then(function (_data) {
        $scope.user = _data;
        $scope.loading=false;
        $state.go('app.login');



      }, function (_error) {
       
        console.log('error'+_error)
        $scope.loading=false;
        alert("Error Creating User  " + _error.debug)*/
     // });



    };

  };
})();
