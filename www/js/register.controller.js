
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
      }, 0);
      registerService.init();
      registerService.register(user).then(function (_data) {
        $scope.user = _data;
        $scope.loading=false;
        $state.go('app.login');



      }, function (_error) {
       
        console.log('error'+_error)
        $scope.loading=false;
        alert("Error Creating User  " + _error.debug)
      });



    };

  };
})();
