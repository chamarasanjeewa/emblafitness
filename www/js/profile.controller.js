
(function () {
  'use strict';
  angular.module('boadingBudgetApp').controller('profileCtrl',profileCtrl);

  profileCtrl.$inject = ['$scope','$timeout','$stateParams','$state','ionicMaterialInk','ionicMaterialMotion','registerService','purchaseService'];
  function profileCtrl($scope, $timeout, $stateParams,$state, ionicMaterialInk,ionicMaterialMotion,registerService,purchaseService) {

    $scope.userName=null;
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.recordList=[];

    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.getUserData = function () {
        registerService.init();
       var currentUser= registerService.getCurrentUser()
       $scope.userName= currentUser.get("username")

    };
    $scope.getLatestInfo=function(){

      purchaseService.init();
      purchaseService.getLatest($scope.filterOptions)
        .then(function(result) {

          if(result!=null){

            var currentUser=registerService.getCurrentUser();

            for (var i = 0; i < result.length; i++) {
              var purchasedItem={
                objectId:result[i].id,
                text: result[i].get("text"),
                amount: result[i].get("amount"),
                purchasedDate: result[i].get("purchasedDate"),
                createdBy:result[i].get("createdBy").get("firstName")

              }
              $scope.recordList.push(purchasedItem);
          
            }
            $scope.$apply();
            $scope.loading = false;

          }

        });

    }

    $scope.$parent.$on( "$ionicView.enter", function() {
      $scope.getLatestInfo();
      $scope.getUserData();
    });



   }
})();
