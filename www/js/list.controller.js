(function () {
  'use strict';
  angular.module('boadingBudgetApp').controller('purchasedListController',purchasedListController);
  purchasedListController.$inject = ['$scope','$state','purchaseService','registerService','moment'];

  function purchasedListController($scope,$state,purchaseService,registerService,moment) {
    $scope.loading = true;
    $scope.totalSum=0;
    $scope.filterOptions={};
    $scope.latestBMI={};
    $scope.date = new moment();

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };

    var currentDate=new Date();
    $scope.filterOptions.year=($scope.filterOptions.year!=undefined)?$scope.filterOptions.year :currentDate.getFullYear().toString();
    $scope.filterOptions.month=($scope.filterOptions.month!=undefined)?$scope.filterOptions.month :currentDate.getMonth().toString();


    $scope.getPurchasedInfo=function(){
    $scope.itemList=[];
    var dateList=[];
    var bmiList=[];
    var recommendedbmiList=[];
    purchaseService.getList($scope.filterOptions)
        .then(function(result) {

           angular.forEach(result, function(value, key){
          
           var recordDate= moment(value.date).format("DD/mm");
           var bmi=purchaseService.calculateBMI(value.height,value.weight);
           dateList.push(recordDate)
           bmiList.push(bmi);
           recommendedbmiList.push(25);
          });
         
        $scope.labels =dateList;// ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['recommended BMI','Your BMI'];
        $scope.colours=['Blue','red']
        $scope.data = [
         recommendedbmiList,
         bmiList
        ];
                  $scope.loading = false;
            

        });

    }

    $scope.getLatest=function(){

     purchaseService.getLatest().then(function(result){

             angular.forEach(result, function(value, key){
             var bmi=purchaseService.calculateBMI(value.height,value.weight);
             $scope.latestBMI={
                height:value.height,
                weight:value.weight,
                bmi:bmi

             };
             });

          })
    }

    $scope.delete=function(item){
      $scope.loading = true;
      purchaseService.get(item.objectId).then(function(data) {
        purchaseService.delete(data).then(function(data) {
          $scope.getPurchasedInfo();
        })
      })
      
    }

     $scope.$parent.$on( "$ionicView.enter", function() {
      $scope.getLatest();
      $scope.getPurchasedInfo();

    });
  }

})();
