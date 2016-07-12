// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
      }
    }
  })



  .state('app.contact', {
      url: '/contact',
      views: {
        'menuContent': {
          templateUrl: 'templates/contact.html',
            controller: 'ContactCtrl'
        }
      }
    })

    .state('app.knowus', {
        url: '/knowus',
        views: {
          'menuContent': {
            templateUrl: 'templates/knowus.html',
              controller: 'KnowusCtrl'
          }
        }
      })

      .state('app.productcategory', {
          url: '/productcategory/:id/:subid',
          views: {
            'menuContent': {
              templateUrl: 'templates/productcategory.html',
                controller: 'ProductcategoryCtrl'
            }
          }
        })

        .state('app.productdetail', {
            url: '/productdetail',
            views: {
              'menuContent': {
                templateUrl: 'templates/productdetail.html',
                  controller: 'ProductdetailCtrl'
              }
            }
          })

          .state('app.gallery', {
              url: '/gallery',
              views: {
                'menuContent': {
                  templateUrl: 'templates/gallery.html',
                    controller: 'GalleryCtrl'
                }
              }
            })

            .state('app.downloads', {
                url: '/downloads',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/downloads.html',
                      controller: 'DownloadsCtrl'
                  }
                }
              })

    .state('app.product', {
      url: '/product',
      views: {
        'menuContent': {
          templateUrl: 'templates/product.html',
          controller: 'ProductCtrl'
        }
      }
    })
    .state('app.productselect', {
            url: '/productselect',
            views: {
              'menuContent': {
                templateUrl: 'templates/productselect.html',
                  controller: 'ProductSelectCtrl'
              }
            }
          });


  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
})

.filter('serverimage', function() {
    return function(input) {
        if (input) {
            // console.log('serverimage: ', input);
            // return input;
            return imgpath + input;
            // return "http://192.168.0.123/eurobackend/uploads"+input;
        } else {
            // return "img/logo.png";
        }
    };
});
