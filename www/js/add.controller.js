/*this controller is used to add budget details */
(function () {
  'use strict';
  angular.module('boadingBudgetApp').controller('addItemCtrl',addItemCtrl);

  addItemCtrl.$inject = ['$scope','$timeout','$stateParams','$state','ionicMaterialInk','purchaseService'];
  function addItemCtrl($scope, $timeout, $stateParams,$state, ionicMaterialInk,purchaseService) {
    $scope.loginError=null;
    $scope.loading=false;
    $scope.currentDate=new Date();
    $scope.formData = {};
    $scope.formData.categoryId = "1";
    $scope.calculatedBMI=0;
   
    var datePickerCallback = function (val) {

      if(typeof(val)==='undefined'){

        console.log('Date not selected');
      }else{
        $scope.formData.date=val;
        console.log('Selected date is : ', val);
      }
    };

   $scope.$parent.clearFabs();

    var options = {
      date: new Date(),
      mode: 'date'
    };

   
    $scope.calculateBMI = function () {

      if ($scope.formData.height != undefined) {
        $scope.loading = true;
       //calculation logic
       $scope.calculatedBMI=purchaseService.calculateBMI($scope.formData.height,$scope.formData.weight);
       
        purchaseService.create($scope.formData)
          .then(function (_data) {// if record created successfully
            $scope.loading = false;
            $state.go("app.list");
          }, function (_error) {
            $scope.loading = false;
            console.log('error in saving data' + err)
          });
      }
    };


   }
})();
