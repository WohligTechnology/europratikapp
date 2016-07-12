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

.controller('ContactCtrl', function($scope,MyServices) {

  $scope.formFeedback = {};
$scope.formComplete = false;
  $scope.submitForm = function(formValid) {
    // console.log('form values: ', formData);
    // console.log('form values: ', formValid);
    // console.log('form values: ', $scope.formFeedback);
    if (formValid.$valid) {
      $scope.formComplete = true;
      console.log('in if',$scope.formComplete);
      console.log("$scope.formComplete",'$scope.formComplete');
      MyServices.contactSubmit($scope.formFeedback, function(data) {
        // $scope.contact=data;
        // console.log($scope.contact);
      });
    } else {

    }
  };


})
.controller('KnowusCtrl', function($scope) {

})
.controller('ProductcategoryCtrl', function($scope,$stateParams,MyServices) {

  MyServices.getEachCategory($stateParams.id,function(data) {
    $scope.category=data;
    console.log('$scope.category',$scope.category);

  })


})
.controller('ProductSelectCtrl', function($scope,MyServices,$stateParams) {
  MyServices.getSeries($stateParams.id,function(data) {
    $scope.AllSeries=data;
    $scope.AllSeries = _.chunk($scope.AllSeries, 2);
    console.log('  $scope.AllSeries',$scope.AllSeries);
    // $scope.mydata=data.name;
    // _.each($scope.AllSeries, function(value) {
    //     console.log(value);
    //
    //     value.name = value.name.split(/(\s+)/);
    //     console.log('value.name', value.name);
    });



})

.controller('ProductdetailCtrl', function($scope) {

})
.controller('GalleryInnerCtrl', function($scope,MyServices,$stateParams) {
  // $scope.galleryinside='';
  MyServices.getGalleryInside($stateParams.id,function(data) {
    $scope.galleryinside=data;
    console.log('$scope.galleryinside',$scope.galleryinside);
    $scope.galleryinside = _.chunk($scope.galleryinside, 2);

  });

})
.controller('GalleryCtrl', function($scope,MyServices) {
  MyServices.getGallery(function(data) {
    $scope.gallery=data;
    console.log('$scope.gallery',$scope.gallery);
    $scope.gallery = _.chunk($scope.gallery, 2);

  });



})
.controller('DownloadsCtrl', function($scope,MyServices) {
  MyServices.getDownload(function(data) {
    $scope.download = data;
    console.log('$scope.download',$scope.download);
    $scope.download = _.chunk($scope.download, 2);

  });


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
