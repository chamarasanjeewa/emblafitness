(function () {
  'use strict';
  angular.module('boadingBudgetApp').factory('purchaseService',purchaseService);
  purchaseService.$inject = ['$http','ParseConfiguration','$q'];

  function purchaseService($http,ParseConfiguration,$q) {
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
      getLatest : function() {

        var purchaseInfo=Parse.Object.extend("purchase")
        var query = new Parse.Query(purchaseInfo);
        //query.descending("purchasedDate");
        query.limit = 5;
         query.include("createdBy");

        return query.find();

      },
      getList : function(options) {

        var filter={start:'',end:''};
        var currentDate=new Date();

        options.year=(options.year!=undefined)?options.year:currentDate.getFullYear();
        options.month=(options.month!=undefined)?options.month:currentDate.getMonth();
        var lastDate= new Date(options.year, ( parseInt(options.month)+1), 0);

        filter.start= new Date(options.year,options.month, 1);
        filter.end=lastDate;

        var purchaseInfo=Parse.Object.extend("purchase")
        var query = new Parse.Query(purchaseInfo);


        query.greaterThanOrEqualTo("purchasedDate", filter.start);
        query.lessThanOrEqualTo("purchasedDate", filter.end);
        query.include("createdBy");

        return query.find();

      },
      create : function(data) {
        var _parseInitUser = _parseInitUser ? _parseInitUser : Parse.User.current();

        var purchaseInfo=Parse.Object.extend("purchase")
        var purchase = new purchaseInfo();
        purchase.set("text",data.text);
        purchase.set("purchasedDate",data.date);
        purchase.set("amount",data.amount);
        purchase.set("createdBy",_parseInitUser);

        return purchase.save(purchase);

       // return purchase.save(null, {});

        //return $http.post(apiUrl+'/api/purchased', data);

      },
      get : function(id) {

        var purchaseInfo=Parse.Object.extend("purchase")
        var query = new Parse.Query(purchaseInfo);
        return query.get(id);
      },

      delete : function(object) {

        var purchaseInfo=Parse.Object.extend("purchase")
        var query = new Parse.Query(purchaseInfo);

        return object.destroy({});
      },

    }
  }
})();



