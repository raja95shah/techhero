// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('techhero', ['ionic', 'starter.controllers','auth0', 'angular-storage', 'angular-jwt'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,authProvider,$httpProvider, jwtInterceptorProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'loginCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  
   .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
          controller: 'getting'
      }
    }
  })
 
  
  .state('app.learn', {
    url: '/learn',
    views: {
      'menuContent': {
        templateUrl: 'templates/learn.html'
      }
    }
  })
  
  .state('app.quiz', {
      url: '/quiz',
      views: {
        'menuContent': {
          templateUrl: 'templates/quiz.html'
        }
      }
    })
  
  .state('app.aboutus', {
    url: '/aboutus',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutus.html'
      }
    }
  })
  .state('app.contactus', {
    url: '/contactus',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactus.html'
      }
    }
  })
  .state('app.faq', {
    url: '/faq',
    views: {
      'menuContent': {
        templateUrl: 'templates/faq.html'
      }
    }
  })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
    
    authProvider.init({
    domain: 'techhero.auth0.com',
    clientID: 'NhaJIFd2NcMV4KgkEcslRFMYw57hqC93'
  })
     jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

  $httpProvider.interceptors.push('jwtInterceptor');
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})
.run(function(auth) {
  // This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();
});
