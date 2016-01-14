(function () {
    'use strict';
    angular.module('boadingBudgetApp').controller('purchasedListController',purchasedListController);
    purchasedListController.$inject = ['$scope','$state','PurchaseService'];

    function purchasedListController($scope,$state,PurchaseService) {
        $scope.loading = true;
        $scope.test="test";
        $scope.totalSum=0;
        $scope.options={};
        var currentDate=new Date();
        $scope.options.year=($scope.options.year!=undefined)?$scope.options.year:currentDate.getFullYear();
        $scope.options.month=($scope.options.month!=undefined)?$scope.options.month:currentDate.getMonth();

        $scope.getPurchasedInfo=function(){
            $scope.itemList={}
            PurchaseService.get($scope.options)
                .success(function(data) {
                    $scope.options=data.options;
                    $scope.itemList = data.list;
                    $scope.loading = false;
                    if($scope.itemList!=undefined){
                    $scope.totalSum = Object.keys($scope.itemList).map(function(k){
                        return +$scope.itemList[k].amount;
                    }).reduce(function(a,b){ return a + b },0);
                    }

                });

        }

        $scope.delete=function(item){
            $scope.loading = true;
            PurchaseService.delete(item._id).success(function(data) {
                $scope.getPurchasedInfo();
               // $scope.loading = false;
            }).error(function(err){
                $scope.getPurchasedInfo();
                console.log('error deleting record'+err)
               // $scope.loading = false;
            });
        }

        $scope.$parent.$on( "$ionicView.enter", function() {
            $scope.getPurchasedInfo();
            /*if( states.fromCache && states.stateName == "tabs.list" ) {
                $scope.getPurchasedInfo();
            }*/
        });
    }

})();