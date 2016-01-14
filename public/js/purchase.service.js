(function () {
    'use strict';
angular.module('boadingBudgetApp').factory('PurchaseService',PurchaseService);
PurchaseService.$inject = ['$http'];
var apiUrl='https://bmann.herokuapp.com';
//apiUrl='http://localhost:8080';

function PurchaseService($http) {
    return {
      get : function(options) {

          return $http.get(apiUrl+'/api/purchased?year='+options.year+'&month='+options.month);
      },
      create : function(data) {
        return $http.post(apiUrl+'/api/purchased', data);

      },
      delete : function(id) {
        return $http.delete(apiUrl+'/api/purchased/' + id);
      },
      signIn:function(signInData) {

        return $http.post(apiUrl+'/api/login', signInData);

      },

        IsUserNameAvailable:function(userName) {
            return $http.post(apiUrl+'/api/userNameExists',{userName:userName});

        },

       register:function(registerData) {

        return $http.post(apiUrl+'/api/register', registerData);

      }
    }
  }
})();



