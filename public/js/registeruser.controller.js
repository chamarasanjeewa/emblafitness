
(function () {
    'use strict';
    angular.module('boadingBudgetApp').controller('RegisterCtrl',RegisterCtrl);
    RegisterCtrl.$inject = ['$scope','$state','PurchaseService'];

    function RegisterCtrl($scope, $state,PurchaseService) {
        $scope.loading=false;
        $scope.register = function(user) {
            $scope.loading=true;
            PurchaseService.register(user)
                .success(function(data) {

                    $state.go('signin');
                    $scope.loading=false;
                }).error(function(data) {
                    console.log('error')
                    $scope.loading=false;
                });

        };

    };
})();