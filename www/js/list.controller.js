(function () {
  'use strict';
  angular.module('boadingBudgetApp').controller('purchasedListController',purchasedListController);
  purchasedListController.$inject = ['$scope','$state','purchaseService','registerService'];

  function purchasedListController($scope,$state,purchaseService,registerService) {
    $scope.loading = true;
    $scope.totalSum=0;
    $scope.filterOptions={};

    var currentDate=new Date();
    $scope.filterOptions.year=($scope.filterOptions.year!=undefined)?$scope.filterOptions.year :currentDate.getFullYear().toString();
    $scope.filterOptions.month=($scope.filterOptions.month!=undefined)?$scope.filterOptions.month :currentDate.getMonth().toString();


    $scope.getPurchasedInfo=function(){
      $scope.itemList=[];

      purchaseService.init();
      purchaseService.getList($scope.filterOptions)
        .then(function(result) {

          if(result!=null){

            var currentUser=registerService.getCurrentUser();

            for (var i = 0; i < result.length; i++) {
              var purchasedItem={
                objectId:result[i].id,
                text: result[i].get("text"),
                amount: result[i].get("amount"),
                purchasedDate: result[i].get("purchasedDate"),
                createdBy:result[i].get("createdBy").get("firstName"),
                deletable:(currentUser.get("username")==result[i].get("createdBy").get("username"))

              }
             $scope.itemList.push(purchasedItem);
            }
            $scope.loading = false;
            if($scope.itemList!=undefined){
              $scope.totalSum = Object.keys($scope.itemList).map(function(k){
                return +$scope.itemList[k].amount;
              }).reduce(function(a,b){ return a + b },0);
              $scope.$apply()
            } else{
              $scope.itemList=[];
            }
          }

        });

    }




    $scope.delete=function(item){
      $scope.loading = true;
      purchaseService.get(item.objectId).then(function(data) {
        purchaseService.delete(data).then(function(data) {
          $scope.getPurchasedInfo();
        })
      })
      //.error(function(err){
      /*    $scope.getPurchasedInfo();
       console.log('error deleting record'+err)
       // $scope.loading = false;
       });*/
    }

    $scope.$parent.$on( "$ionicView.enter", function() {
      $scope.getPurchasedInfo();
    });
  }

})();
