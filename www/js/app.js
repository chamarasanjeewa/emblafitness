

angular.module('boadingBudgetApp', ['ionic','ionic.service.core', 'ionic-material', 'ionMdInput','ngMessages','firebase','chart.js', 'angularMoment'])

angular.module('boadingBudgetApp').constant('KEYS', {
    firebase: 'blistering-torch-9435.firebaseio.com',
  })

//angular.module('boadingBudgetApp').constant("moment", moment);

angular.module('boadingBudgetApp').run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
         var push = new Ionic.Push({
    "debug": true
  });
 
  push.register(function(token) {
    console.log("Device token:",token.token);
  });
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




/*angular.module('boadingBudgetApp').directive('emailAvailable', function($timeout, $q,registerService) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    link: function(scope, elm, attr, model) {
      model.$asyncValidators.emailExists = function() {
        registerService.init();
        return registerService.IsEmailAvailable(model.$viewValue).then(function(result){
          debugger;
          $timeout(function(){
            model.$setValidity('emailExists', result.length==0);
          }, 1000);
        });

      };
    }
  }
});*/

