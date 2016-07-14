angular.module('starter.controllers', ['starter.services', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  })
  .controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices, $ionicSlideBoxDelegate) {

    MyServices.getSlider(function(data) {
      $scope.sliderdata = data;
      console.log('$scope.sliderdata', $scope.sliderdata);
      $ionicSlideBoxDelegate.update();
    })

    $scope.slideHasChanged = function(index) {
      if (index == ($scope.sliderdata.length - 1)) {
        $timeout(function() {
          $ionicSlideBoxDelegate.slide(0);
        }, 4000);
      }
    }

    MyServices.getHomePics(function(data) {
      $scope.HomePics = data;
      console.log('$scope.HomePics', $scope.HomePics[0].image2);

    });
    MyServices.getExclusiveProduct(function(data) {
      $scope.ExclusiveProduct = data;
      console.log('$scope.ExclusiveProduct', $scope.ExclusiveProduct);

    });
    MyServices.getPopularPdts(function(data) {
      $scope.brandlist = data;
      console.log('$scope.brandlist', $scope.brandlist);

    });
    $scope.subscribe = {};
    $scope.subscribe.email = "";
    $scope.checkEmail = false;
    $scope.subscribeEmail = false;
    $scope.subscribe = function(email) {

      MyServices.subscribe(email, function(data) {

        // console.log(data);
        if (!data.value) {
          if ($scope.subscribe.email) {
            $scope.checkEmail = true;
            $scope.subscribeEmail = false;
          }
        } else {
          $scope.subscribeEmail = true;
          $scope.checkEmail = false;
        }
        //console.log(email);
        $scope.subscribe.email = "";
      });

      // $scope.subscribeEmail = data;
    };


  })

.controller('ContactCtrl', function($scope, MyServices) {

    $scope.formFeedback = {};
    $scope.formComplete = false;
    $scope.submitForm = function(formValid) {
      // console.log('form values: ', formData);
      // console.log('form values: ', formValid);
      // console.log('form values: ', $scope.formFeedback);
      if (formValid.$valid) {
        $scope.formComplete = true;
        console.log('in if', $scope.formComplete);
        console.log("$scope.formComplete", '$scope.formComplete');
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
  .controller('ProductcategoryCtrl', function($scope, $stateParams, MyServices, $state) {

    // MyServices.getEachCategory($stateParams.id,function(data) {
    //   $scope.category=data;
    //   console.log('$scope.category',$scope.category);
    //
    // });
    // MyServices.getEachSeriesPdts($stateParams.id,$scope.code,function(data) {
    //   $scope.isSeries=true;
    //   $scope.seriesProducts = data.data.queryresult;
    //   $scope.seriesProducts = _.chunk($scope.seriesProducts, 2);
    //   console.log('$scope.seriesProducts',$scope.seriesProducts);
    //
    // })
    $scope.pagenumber = 1;
    var lastpage = 1;
    $scope.objfilter = {};
    $scope.objfilter.id = $stateParams.id;
    $scope.objfilter.subcat = $stateParams.subid;
    $scope.objfilter.pagenumber = 1;
    $scope.products = [];
    $scope.infiniteScroll = true;

    $scope.getProductBuCategory = function() {
      MyServices.getEachSeriesPdts($scope.objfilter, function(data) {
        lastpage = data.data.lastpage;
        _.each(data.data.queryresult, function(n) {
          $scope.products.push(n);
        });
        $scope.seriesProducts = _.chunk($scope.products, 2);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.loadMore = function() {
      if (lastpage >= $scope.objfilter.pagenumber) {
        ++$scope.objfilter.pagenumber;
        $scope.getProductBuCategory();
      } else {
        $scope.infiniteScroll = false;
      }
    };

    $scope.getProductBuCategory();

    $scope.goToDetail = function(productid) {
      // ui-sref="app.productdetail({id:pro.id})"
      $state.go("app.productdetail", {
        catid: $scope.objfilter.id,
        subcatid: $scope.objfilter.subcat,
        id: productid
      })
    }

    // MyServices.getEachSeries($stateParams.id, function(data) {
    //   $scope.series = data.filter.subcategory;
    //
    //   for (i = 0; i < $scope.series.length; i++) {
    //     if ($scope.series[i].name == page) {
    //       $scope.code = $scope.series[i].id;
    //     }
    //   }
    //   MyServices.getEachSeriesPdts($stateParams.id, $scope.code, function(data) {
    //     $scope.isSeries = true;
    //     $scope.seriesProducts = data.data.queryresult;
    //   });
    //

  })
  .controller('ProductSelectCtrl', function($scope, MyServices, $stateParams, $state) {

    MyServices.getSeries($stateParams.id, function(data) {
      $scope.AllSeries = data;
      $scope.AllSeries = _.chunk($scope.AllSeries, 2);
      console.log('  $scope.AllSeries', $scope.AllSeries);

    });

    // ui-sref="app.productcategory({id:series.id})"

    $scope.goToCategory = function(series) {
      console.log(series);
      $state.go("app.productcategory", {
        id: $stateParams.id,
        subid: series.id
      })
    }

    // MyServices.getAllSeries(function(data) {
    //   $scope.allSeries = data;
    //   console.log(data);
    // });


  })

.controller('ProductdetailCtrl', function($scope, MyServices, $stateParams, $cordovaSocialSharing, $filter, $ionicModal, $ionicLoading, $timeout) {
    // MyServices.getProductDetail($stateParams.id, function(data) {
    //   $scope.ProductDetails = data;
    //   console.log('$scope.ProductDetails', $scope.ProductDetails);
    //   //$scope.galleryinside = _.chunk($scope.galleryinside, 2);
    //
    // });

    $scope.objfilter = {};
    $scope.objfilter.id = $stateParams.catid;
    $scope.objfilter.subcat = $stateParams.subcatid;
    $scope.objfilter.pagenumber = 1;
    $scope.foundIndex = 0;

    MyServices.getAllProductsDetail($scope.objfilter, function(data) {
      $scope.productArr = data.data.queryresult;
      $scope.foundIndex = _.findIndex($scope.productArr, {
        'id': $stateParams.id
      });
      $scope.ProductDetails = $scope.productArr[$scope.foundIndex];
    });

    $scope.shareProduct = function() {
      var image = $filter("serverimage")($scope.ProductDetails.image);
      console.log(image);
      $cordovaSocialSharing
        .share('', '', image, '') // Share via native share sheet
        .then(function(result) {
          // Success!
        }, function(err) {
          // An error occured. Show a message to the user
        });
    }

    $scope.changeProduct = function(val) {
      $scope.foundIndex = $scope.foundIndex + val;
      if ($scope.foundIndex >= 0 && $scope.foundIndex < $scope.productArr.length) {
        $ionicLoading.show({
          template: 'Please Wait...'
        })
        $scope.ProductDetails = {};
        $timeout(function() {
          $scope.ProductDetails = $scope.productArr[$scope.foundIndex];
          $ionicLoading.hide();
        }, 500);
      }
    }

    $ionicModal.fromTemplateUrl('templates/popup.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function() {
      $scope.modalImage = $scope.ProductDetails.image;
      $scope.modal.show();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

  })
  .controller('GalleryInnerCtrl', function($scope, MyServices, $stateParams) {
    // $scope.galleryinside='';
    MyServices.getGalleryInside($stateParams.id, function(data) {
      $scope.galleryinside = data;
      console.log('$scope.galleryinside', $scope.galleryinside);
      $scope.galleryinside = _.chunk($scope.galleryinside, 2);

    });

  })
  .controller('NotificationCtrl', function($scope, MyServices, $stateParams) {
    // $scope.galleryinside='';
    MyServices.getGalleryInside($stateParams.id, function(data) {
      $scope.galleryinside = data;
      console.log('$scope.galleryinside', $scope.galleryinside);
      $scope.galleryinside = _.chunk($scope.galleryinside, 2);

    });

  })
  .controller('GalleryCtrl', function($scope, MyServices) {
    MyServices.getGallery(function(data) {
      $scope.gallery = data;
      console.log('$scope.gallery', $scope.gallery);
      $scope.gallery = _.chunk($scope.gallery, 2);

    });



  })
  .controller('DownloadsCtrl', function($scope, MyServices) {
    MyServices.getDownload(function(data) {
      $scope.download = data;
      console.log('$scope.download', $scope.download);
      $scope.download = _.chunk($scope.download, 2);

    });


  })



.controller('ProductCtrl', function($scope, $stateParams, $ionicModal, MyServices) {
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

    $scope.brands = data;
    $scope.brands = _.chunk($scope.brands, 2);
    console.log('$scope.brands', $scope.brands);

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
