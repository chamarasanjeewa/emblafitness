(function () {
  'use strict';
  angular.module('boadingBudgetApp').factory('registerService',registerService);
  registerService.$inject = ['$http','ParseConfiguration','$q'];

  function registerService($http,ParseConfiguration,$q) {
    var parseInitialized = false;


    return {
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

        return Parse.User.logIn(signInData.username, signInData.password);
        //return $http.post(apiUrl+'/api/login', signInData);

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

      createUserProfile:function(registerData) {
        var _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();
        var userProfileInfo=Parse.Object.extend("UserProfile")
        var userProfile = new userProfileInfo();
        userProfile.set("firstName", registerData.firstName);
        userProfile.set("lastName", registerData.lastName);
        userProfile.set("email", registerData.email);
        userProfile.set("phoneNumber", registerData.phoneNumber);
        userProfile.set("createdBy", _parseInitUser);
        userProfile.set("updatedBy", _parseInitUser);
        userProfile.set("user", _parseInitUser);
        return userProfile.save(null, {})
      },

      getCurrentUser:function(){
        return Parse.User.current();
      },

      register:function(registerData) {


        var user = new Parse.User();

        user.set("username", registerData.username);
        user.set("password",registerData.password);
        user.set("firstName", registerData.firstName);
        user.set("lastName", registerData.lastName);
        user.set("email", registerData.email);
        user.set("phoneNumber", registerData.phoneNumber);
        return user.signUp(null, {})


      }
    }
  }
})();



