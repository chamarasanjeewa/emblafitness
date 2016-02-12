(function () {
  'use strict';
  angular.module('boadingBudgetApp').factory('registerService',registerService);
  registerService.$inject = ['$http','ParseConfiguration','$q','$firebase','KEYS'];

  function registerService($http,ParseConfiguration,$q,$firebase,KEYS) {
    var parseInitialized = false;

    return {
      fireBase:function(){
          return new Firebase(KEYS.firebase); 
      },
      init: function () {


        // if initialized, then return the activeUser
        if (parseInitialized === false) {
          Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
          parseInitialized = true;
          console.log("parse initialized in init function");
        }

        var currentUser = Parse.User.current();
        if (currentUser) {
          return $q.when(currentUser);
        } else {
          return $q.reject({error: "noUser"});
        }

      },

      signIn:function(signInData) {
       
        
        //return Parse.User.logIn(signInData.username, signInData.password);
        //return $http.post(apiUrl+'/api/login', signInData);

        var ref = new Firebase(KEYS.firebase); 
       return ref.authWithPassword({
          email    : "chamara@eddmbla.asia",
          password : "sanjusanju"
        }, function(error, authData) {
          if (error) {
            return error;
           
          } else {
            return authData;
   
       } 
     });



      },
      IsUserNameAvailable:function(userName) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", userName);  // find all the women
        return  query.find();


      },
      IsEmailAvailable:function(email) {

        var query = new Parse.Query(Parse.User);
        query.equalTo("email", email);  // find all the women
        return  query.find();


      },

     // createUserProfile:function(registerData) {

        // var ref = new Firebase("blistering-torch-9435.firebaseio.com"); 

       /* var _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();
        var userProfileInfo=Parse.Object.extend("UserProfile")
        var userProfile = new userProfileInfo();
        userProfile.set("firstName", registerData.firstName);
        userProfile.set("lastName", registerData.lastName);
        userProfile.set("email", registerData.email);
        userProfile.set("phoneNumber", registerData.phoneNumber);
        userProfile.set("createdBy", _parseInitUser);
        userProfile.set("updatedBy", _parseInitUser);
        userProfile.set("user", _parseInitUser);
        return userProfile.save(null, {}
      },)*/

      getCurrentUser:function(){
        return Parse.User.current();
      },

      register:function(registerData) {

          var ref =new Firebase(KEYS.firebase); 
      
          ref.createUser({
          email    : registerData.email,
          password : registerData.password
}).then(function(result){

 return createProfile(registerData, result);
})

function createProfile(registerData, user){ 
 var ref =new Firebase(KEYS.firebase); 

var usersRef = ref.child("userProfile");

usersRef.push({
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



