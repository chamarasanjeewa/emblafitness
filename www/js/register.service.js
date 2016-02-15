(function () {
  'use strict';
  angular.module('boadingBudgetApp').factory('registerService',registerService);
  registerService.$inject = ['$http','$q','$firebase','KEYS',"$firebaseObject",'$firebaseAuth'];

  function registerService($http,$q,$firebase,KEYS,$firebaseObject,$firebaseAuth) {
   
    return {
      fireBase:function(){
          return new Firebase(KEYS.firebase); 
      },
      init: function () {
      },

      signIn:function(signInData) {
       
        var ref = new Firebase(KEYS.firebase); 
       return ref.authWithPassword({
          email    : signInData.email,
          password : signInData.password
        })
      },
      
      IsEmailAvailable:function(email) {

       var ref =new Firebase(KEYS.firebase)
       var refUserProfile =ref.child('userProfile').child().child('email');
       debugger; 
       var result=  $firebaseObject( refUserProfile.equalTo(email));
       return result.$loaded()
     
      },

    
      getCurrentUser:function(){

        var ref =new Firebase(KEYS.firebase)
       
        var uid = $firebaseAuth(ref).$getAuth().uid;

        var refUserProfile =ref.child('userProfile'); 
        var currentUserProfile=  $firebaseObject(refUserProfile.child(uid));

       return currentUserProfile.$loaded()
        
  .catch(function(err) {
    $scope.error = 'There was an error with the request';
});
      
      },

      register:function(registerData) {

          var ref =new Firebase(KEYS.firebase); 
      
         return ref.createUser({
          email    : registerData.email,
          password : registerData.password
        }).then(function(result){

         return createProfile(registerData, result);
        })

function createProfile(registerData, user){ 
 var ref =new Firebase(KEYS.firebase); 

var usersRef = ref.child("userProfile").child(user.uid);

  usersRef.set({
    id:user.uid,
    firstName:registerData.firstName,
    lastName:registerData.lastName,
    email:registerData.email,
    phoneNumber:registerData.phoneNumber,

      }
  );



};


      }
    }
  }
})();



