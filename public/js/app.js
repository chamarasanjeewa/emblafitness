(function () {
    'use strict';
angular.module('boadingBudgetApp', ['ionic','ngMessages']);


 angular.module('boadingBudgetApp').config(['$stateProvider', '$urlRouterProvider','$httpProvider',function ($stateProvider, $urlRouterProvider,$httpProvider)
   {

$httpProvider.defaults.useXDomain = true;
delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

$stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'signin.html',
      controller: 'SignInCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'register.html',
      controller: 'RegisterCtrl'
    })
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/forgot-password.html'
    })
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'tabs.html'
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'home.html',
          controller: 'HomeTabCtrl'
        }
      }
    })
    .state('tabs.list', {
      cache: false,
      url: '/list',
      views: {
        'about-tab': {
          templateUrl: 'purchasedList.html',
         controller: 'purchasedListController'
        }
      }
    })

    .state('tabs.about', {
      url: '/about',
      views: {
        'about-tab': {
          templateUrl: 'templates/about.html'
        }
      }
    })



   $urlRouterProvider.otherwise('/signin');
}

 ]);

angular.module('boadingBudgetApp').directive('usernameAvailable', function($timeout, $q,PurchaseService) {
    return {
        restrict: 'AE',
        require: 'ngModel',
        link: function(scope, elm, attr, model) {
            model.$asyncValidators.usernameExists = function() {

                return PurchaseService.IsUserNameAvailable(model.$viewValue).then(function(result){
                    $timeout(function(){
                        model.$setValidity('usernameExists', !!result.data);
                    }, 1000);
                });

            };
        }
    }
});
})();


