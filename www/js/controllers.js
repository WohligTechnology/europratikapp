angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })
  .controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices) {

     MyServices.getSlider(function(data) {
       $scope.sliderdata=data;
       console.log('$scope.sliderdata',$scope.sliderdata);

     })
     MyServices.getSlider(function(data) {
       $scope.sliderdata=data;
       console.log('$scope.sliderdata',$scope.sliderdata);

     });
     MyServices.getHomePics(function(data) {
       $scope.HomePics=data;
       console.log('$scope.HomePics',$scope.HomePics[0].image2);

     });
     MyServices.getExclusiveProduct(function(data) {
       $scope.ExclusiveProduct=data;
       console.log('$scope.ExclusiveProduct',$scope.ExclusiveProduct);

     });
     MyServices.getPopularPdts(function(data) {
       $scope.brandlist=data;
       console.log('$scope.brandlist',$scope.brandlist);

     })

  })

.controller('ContactCtrl', function($scope) {

})
.controller('KnowusCtrl', function($scope) {

})
.controller('ProductcategoryCtrl', function($scope,$stateParams,MyServices) {

  MyServices.getEachCategory($stateParams.id,function(data) {
    $scope.category=data;
    console.log('$scope.category',$scope.category);

  })


})
.controller('ProductSelectCtrl', function($scope) {

})

.controller('ProductdetailCtrl', function($scope) {

})
.controller('GalleryCtrl', function($scope) {

})
.controller('DownloadsCtrl', function($scope) {

})



.controller('ProductCtrl', function($scope, $stateParams, $ionicModal,MyServices) {
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

  MyServices.getAllProducts(function(data) {

    $scope.brands=data;
    $scope.brands = _.chunk($scope.brands, 2);
    console.log('$scope.brands',$scope.brands);

  })

//   $scope.products = [{
//     "image": "img/acrylam_tuff.jpg"
//   }, {
//     "image": "img/Acrylyte.jpg"
//   }, {
//     "image": "img/adhesive-pro.jpg"
//   }, {
//     "image": "img/corriano.jpg"
//   }, {
//     "image": "img/Decolite.jpg"
//   }, {
//     "image": "img/Decoart5.jpg"
//   }, {
//     "image": "img/Decopanel4.jpg"
//   }, {
//     "image": "img/Decoris.jpg"
//   }, {
//     "image": "img/Egger.jpg"
//   }, {
//     "image": "img/Emporio.jpg"
//   },{
//     "image": "img/Fashion_wall.jpg"
//   },{
//     "image": "img/flos.jpg"
//   },{
//     "image": "img/Forescolor3.jpg"
//   },{
//     "image": "img/Lucento.jpg"
//   },{
//     "image": "img/Neboard2.jpg"
//   },{
//     "image": "img/Matrix.jpg"
//   }
//
//
// ];


});
