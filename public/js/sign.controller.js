(function () {
    'use strict';
    angular.module('boadingBudgetApp').controller('SignInCtrl',SignInCtrl);
    SignInCtrl.$inject = ['$scope','$state','PurchaseService'];

    function SignInCtrl($scope, $state,PurchaseService) {
        $scope.loginError=null;
        $scope.loading=false;
        $scope.signIn = function(user) {
            $scope.loading=true;
            PurchaseService.signIn(user)
                .success(function(data) {

                    $state.go('tabs.home');
                    $scope.loading=false;
                }).error(function(data) {
                    $scope.loginError="User name or password invalid or not connected to internet";
                    console.log('unauthorized ')
                    $scope.loading=false;
                });

        };

        $scope.register = function(user) {
            PurchaseService.register(user)
                .success(function(data) {
                    $state.go('tabs.home');
                }).error(function(data) {

                });

        };

    };
})();