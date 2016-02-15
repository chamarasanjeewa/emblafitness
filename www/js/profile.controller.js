
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
      
       var currentUser= registerService.getCurrentUser().then(function(data){
       $scope.userName= data.firstName;
       })
    };
    $scope.getLatestInfo=function(){
      
    }

    $scope.$parent.$on( "$ionicView.enter", function() {
      $scope.getLatestInfo();
      $scope.getUserData();
    });



   }
})();
