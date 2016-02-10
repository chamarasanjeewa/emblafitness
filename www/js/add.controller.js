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
    $scope.formData.date= new Date();
   

    var datePickerCallback = function (val) {
      if(typeof(val)==='undefined'){
        console.log('Date not selected');
      }else{
        $scope.formData.date=val;
        console.log('Selected date is : ', val);
      }
    };

    $scope.datepickerObject = {
      titleLabel: 'Title',  //Optional
      todayLabel: 'Today',  //Optional
      closeLabel: 'Close',  //Optional
      setLabel: 'Set',  //Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),  //Optional
      mondayFirst: true,  //Optional
     /* disabledDates: disabledDates, //Optional
      weekDaysList: weekDaysList, //Optional
      monthList: monthList, //Optional
     */ templateType: 'popup', //Optional
      showTodayButton: 'true', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2), //Optional
      to: new Date(2018, 8, 25),  //Optional
      callback: function (val) {  //Mandatory
        datePickerCallback(val);
      },
      dateFormat: 'dd-MM-yyyy', //Optional
      closeOnSelect: false, //Optional
    };

   

   $scope.$parent.clearFabs();

    var options = {
      date: new Date(),
      mode: 'date'
    };

   
    $scope.createPurchaseItem = function () {

      if ($scope.formData.text != undefined) {
        $scope.loading = true;
        purchaseService.init();
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
