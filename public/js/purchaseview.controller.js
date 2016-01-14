(function () {
    'use strict';
angular.module('boadingBudgetApp').controller('HomeTabCtrl',HomeTabCtrl);
HomeTabCtrl.$inject = ['$scope','$state','PurchaseService'];

function HomeTabCtrl($scope,$state,PurchaseService) {
    $scope.formData = {};
    $scope.loading = false;
    $scope.formData.categoryId = "1";

    $scope.createPurchaseItem = function () {

        if ($scope.formData.text != undefined) {
            $scope.loading = true;

            PurchaseService.create($scope.formData)

                // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    $scope.loading = false;
                    $state.go("tabs.list");

                }).error(function (err) {
                    $scope.loading = false;
                    console.log('error in saving data' + err)
                });
        }
    };

}
})();









