angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })
  .controller('HomeCtrl', function($scope, $ionicModal, $timeout) {

  })

.controller('ContactCtrl', function($scope) {

})

.controller('ProductCtrl', function($scope, $stateParams, $ionicModal) {
  $ionicModal.fromTemplateUrl('templates/popup.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(product) {
    $scope.modalImage = product.image;
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.products = [{
    "image": "img/acrylam_tuff.jpg"
  }, {
    "image": "img/Acrylyte.jpg"
  }, {
    "image": "img/adhesive-pro.jpg"
  }, {
    "image": "img/corriano.jpg"
  }, {
    "image": "img/Decolite.jpg"
  }, {
    "image": "img/Decoart5.jpg"
  }, {
    "image": "img/Decopanel4.jpg"
  }, {
    "image": "img/Decoris.jpg"
  }, {
    "image": "img/Egger.jpg"
  }, {
    "image": "img/Emporio.jpg"
  }];

  $scope.products = _.chunk($scope.products, 2);

});
