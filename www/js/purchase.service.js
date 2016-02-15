(function () {
  'use strict';
  angular.module('boadingBudgetApp').factory('purchaseService',purchaseService);
  purchaseService.$inject = ['$http','$q','$firebase','KEYS',"$firebaseObject",'$firebaseAuth'];

  function purchaseService($http,$q,$firebase,KEYS,$firebaseObject,$firebaseAuth) {
    
    return {
      calculateBMI:function(height,weight){
          var bmi = (weight) / (height * height);
          return bmi;
      },
      getBMIState:function(bmi){

        var bmiState ="";
        if(18.5 > bmi){
            bmiState = "Underweight";
        }else if(18.5 <= bmi && bmi < 25){
            bmiState = "Normal";
        }else if(25 <= bmi && bmi  < 30){
            bmiState = "Overweight";
        }else if(30 <= bmi){
            bmiState = "Obese";
        }
        return bmiState ;
      },

      getLatest : function() {

      
      },
      
      getList : function(options) {

      var ref =new Firebase(KEYS.firebase); 
      var uid = $firebaseAuth(ref).$getAuth().uid;
      var bmiRef = ref.child("bmi");
      bmiRef.orderByChild("userId").limitToLast(1000);
      var result=  $firebaseObject( bmiRef.orderByChild("userId").limitToLast(1000));
      return result.$loaded()
      },

      create : function(data) {
       var ref =new Firebase(KEYS.firebase); 
      var uid = $firebaseAuth(ref).$getAuth().uid;
       var currentDate=new Date().toString();
       var bmiRef = ref.child("bmi")

       return bmiRef.push({
          userId:uid,
          height:data.height,
          weight:data.weight,
          date: currentDate
            }
        );

      },
      get : function(id) {
   },

      delete : function(object) {
    },

    }
  }
})();



