
angular.module('boadingBudgetApp', ['ionic', 'ionic-material', 'ionMdInput','ngMessages','ionic-datepicker'])

angular.module('boadingBudgetApp').run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

angular.module('boadingBudgetApp').config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for  simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
      .state('app.list', {
        url: '/list',
        views: {
          'menuContent': {
            templateUrl: 'templates/purchased.list.html',
            controller: 'purchasedListController'
          }

        }
      })

      .state('app.item', {
        url: '/item',
        views: {
          'menuContent': {
            templateUrl: 'templates/add.item.html',
            controller: 'addItemCtrl'
          }

        }
      })

     .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'RegisterCtrl'
        },
        'fabContent': {
          template: ''
        }
      }
    })
    .state('app.profile', {
        url: '/profile',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'profileCtrl'
            }

        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});

angular.module('boadingBudgetApp').value('ParseConfiguration', {
  applicationId: "CiaQ24ctvOlZPQot9sLgQi1f2OdNXfJ5sr6FKPEr",
  javascriptKey: "5BYUb144Vr1WYRAUW4kOVjKvjN5uBHuoezV4AYnA"
})

angular.module('boadingBudgetApp').directive('usernameAvailable', function($timeout, $q,registerService) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope, elm, attr, model) {
      model.$asyncValidators.usernameExists = function() {
        registerService.init();
        return registerService.IsUserNameAvailable(model.$viewValue).then(function(result){

          $timeout(function(){
            model.$setValidity('usernameExists', result.length==0);
          }, 1000);
        });

      };
    }
  }
});

angular.module('boadingBudgetApp').directive('emailAvailable', function($timeout, $q,registerService) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope, elm, attr, model) {
      model.$asyncValidators.emailExists = function() {
        registerService.init();
        return registerService.IsEmailAvailable(model.$viewValue).then(function(result){

          $timeout(function(){
            model.$setValidity('emailExists', result.length==0);
          }, 1000);
        });

      };
    }
  }
});

