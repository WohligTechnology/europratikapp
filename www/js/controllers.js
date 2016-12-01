var globalFunction = {};
angular.module('starter.controllers', ['starter.services', 'ngCordova', 'ion-gallery'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicLoading,MyServices) {

  globalFunction.loading = function() {
    $ionicLoading.show({
      template: '<ion-spinner class="spinner-assertive"></ion-spinner>'
    });
    $timeout(function() {
      $ionicLoading.hide();
    }, 10000);
  };
  MyServices.getNotifications(function(data) {
    $ionicLoading.hide();
    $scope.Notifications = data;
    console.log($scope.Notifications.length);
    console.log('$scope.Notifications', $scope.Notifications);

  });

})

.controller('HomeCtrl', function($scope, $ionicModal, $timeout, MyServices, $ionicSlideBoxDelegate, $ionicLoading,$state ) {

  globalFunction.loading();
  MyServices.getSlider(function(data) {
    $scope.sliderdata = data;
    console.log('$scope.sliderdata', $scope.sliderdata);
    $ionicSlideBoxDelegate.update();
    $ionicLoading.hide();
  });
  MyServices.getArrival(function(data) {
console.log(data);
$scope.newArrival=data;
var str = $scope.newArrival[0].link;
str = str.substring(0, str.length - 2);
$scope.newId=str.substring(11);
console.log($scope.newId);
  });
  $scope.goToProduct=function(id){
console.log(id);
$state.go('app.productselect', { id : id });
  }

  $scope.slideHasChanged = function(index) {
    if (index == ($scope.sliderdata.length - 1)) {
      $timeout(function() {
        $ionicSlideBoxDelegate.slide(0);
      }, 4000);
    }
  };

  MyServices.getHomePics(function(data) {
    $scope.HomePics = data.banner;
    console.log('$scope.HomePics', $scope.HomePics[0].image2);

  });
  MyServices.getExclusiveProduct(function(data) {
    _.each(data, function(n) {
      n.link = n.link.split('#/category').join('#/app/productselect');
      n.link = n.link.substring(0, n.link.length - 2);
    })
    console.log(data);
    $scope.ExclusiveProduct = data;
    console.log('$scope.ExclusiveProduct', $scope.ExclusiveProduct);

  });
  MyServices.getPopularPdts(function(data) {
    _.each(data, function(n) {
      n.link = n.link.split('#/category').join('#/app/productselect');
      n.link = n.link.substring(0, n.link.length - 2);
    })


    $scope.brandlist = data;
    console.log('$scope.brandlist', $scope.brandlist);

  });
  $scope.subscribe = {};
  $scope.subscribe.email = "";
  $scope.checkEmail = false;
  $scope.subscribeEmail = false;
  globalFunction.loading();
  $scope.subscribe = function(email) {

    MyServices.subscribe(email, function(data) {
      globalFunction.loading();

      // console.log(data);
      if (!data.value) {
        if ($scope.subscribe.email) {
          console.log($scope.subscribe.email);
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
    $ionicLoading.hide();
    // $scope.subscribeEmail = data;
  };

})

.controller('SearchCtrl', function($scope, MyServices, $ionicLoading, $state ) {

  $scope.getSearchByCat  = function(objname){
      var senddata ={};
    senddata.pageno=1;
    senddata.name=objname;

    MyServices.getsearchresult(senddata,function(data) {
      globalFunction.loading();

      if(data){
        $scope.products = data.queryresult;
        console.log('$scope.gallefcgfgry', $scope.products);
        // $scope.gallery = _.chunk($scope.gallery, 2);
      }
      $ionicLoading.hide();


    });


  }
  $scope.objfilter ={};
$scope.clear =function(){
  $scope.objfilter.name ="";
}
$scope.goToDetail = function(catid,subcatid,prid) {
  // ui-sref="app.productdetail({id:pro.id})"
  $state.go("app.productdetail", {
    catid: catid,
    subcatid: subcatid,
    id: prid
  })
}
  })
.controller('ContactCtrl', function($scope, MyServices, $ionicLoading) {

    $scope.formFeedback = {};
    $scope.formComplete = false;

    $scope.submitForm = function(formValid) {
      // console.log('form values: ', formData);
      // console.log('form values: ', formValid);
      // console.log('form values: ', $scope.formFeedback);
      globalFunction.loading();
      if (formValid.$valid) {
        globalFunction.loading();
        $scope.formComplete = true;
        console.log('in if', $scope.formComplete);
        console.log("$scope.formComplete", '$scope.formComplete');
        MyServices.contactSubmit($scope.formFeedback, function(data) {
          $ionicLoading.hide();
          // $scope.contact=data;
          // console.log($scope.contact);
        });
      }
    };


  })
  .controller('KnowusCtrl', function($scope) {

  })
  .controller('ProductcategoryCtrl', function($scope, $stateParams, MyServices, $state, $ionicLoading, $state) {

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
    globalFunction.loading();
    $scope.getProductBuCategory = function() {

      MyServices.getEachSeriesPdts($scope.objfilter, function(data) {
        $scope.myCatName = data.filter.subcategory[0].name;
        console.log(data.filter.subcategory[0].name);
        lastpage = data.data.lastpage;
        _.each(data.data.queryresult, function(n) {
              console.log("%%%%%%%%%%");
              console.log("Products details");
          $scope.products.push(n);
        });
        $scope.seriesProducts = _.chunk($scope.products, 2);
        $scope.$broadcast('scroll.infiniteScrollComplete');
        $ionicLoading.hide();
        console.log("$scope.seriesProducts", $scope.seriesProducts);
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
    var url = window.location.href;
    //console.log('current url: ', url);
    // if (url.match(/series.*/)) {
    var page = url.substring(url.lastIndexOf('/') + 1);

    MyServices.getEachSeries($stateParams.id, function(data) {
      $scope.series = data.filter.subcategory;

    });
    // }

    $scope.eachSeries = function(id, code) {
      $scope.products = [];
      console.log('pr after', $scope.products);
      $scope.objfilter.pagenumber = 1;
      $scope.objfilter.subcat = code;
      $stateParams.subid = code;
      _.each($scope.series, function(n) {
        if (n.id == code)
          n.class = "cat-active";
        else
          n.class = "";
      });
      $scope.getProductBuCategory();
      // console.log('Id: ', id);
      // console.log('Code: ', code);
      // MyServices.getEachSeriesPdts(id, code, function(data) {
      //   // $state.go('category.series', {code: name})
      //   $scope.isSeries = true;
      //   $scope.seriesProducts = data.data.queryresult;
      //   // if($stateParams.isSeries)
      // });
    };


  })
  .controller('ProductSelectCtrl', function($scope, MyServices, $stateParams, $state, $ionicLoading, $ionicSlideBoxDelegate,$timeout

) {
    globalFunction.loading();
    MyServices.getSeries($stateParams.id, function(data) {
      $scope.AllSeries = data;
    });
    $timeout(function () {
      MyServices.getEachCategory($stateParams.id, function(data) {
        console.log("$$$$$$$$$");
        $scope.category = data;
        // console.log('Category: ', $scope.category);
        // console.log('State: ', $stateParams.id);
      });
    }, 3000);

    MyServices.getGalleryInside($stateParams.id, function(data) {
      $scope.galleryimages = data;
      $ionicSlideBoxDelegate.update();
      $ionicLoading.hide();
    });

    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
    };

    // $scope.slideHasChanged = function(index) {
    //   if (index == ($scope.galleryimages.length - 1)) {
    //     $timeout(function() {
    //       $ionicSlideBoxDelegate.slide(0);
    //     }, 4000);
    //   }
    // };

    $scope.goToCategory = function(series) {
      console.log('mySeries', series);
      $state.go("app.productcategory", {
        id: $stateParams.id,
        subid: series.id
      });
    };

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
    globalFunction.loading();
    MyServices.getAllProductsDetail($scope.objfilter, function(data) {
      $scope.productArr = data.data.queryresult;
      console.log($scope.productArr);
      $scope.foundIndex = _.findIndex($scope.productArr, {
        'id': $stateParams.id
      });
      $scope.ProductDetails = $scope.productArr[$scope.foundIndex];
      $ionicLoading.hide();
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
    };

    $scope.changeProduct = function(val) {
      $scope.foundIndex = $scope.foundIndex + val;
      if ($scope.foundIndex >= 0 && $scope.foundIndex < $scope.productArr.length) {
        $ionicLoading.show({
          template: 'Please Wait...'
        });
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
      console.log('ProductDetails', $scope.ProductDetails);
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

  })
  .controller('GalleryInnerCtrl', function($scope, MyServices, $stateParams, $ionicLoading, $ionicModal, $filter) {
    // $scope.galleryinside='';
    globalFunction.loading();
    $scope.photos = [];

    MyServices.getGalleryInside($stateParams.id, function(data) {
      globalFunction.loading();
      $scope.galleryinside = data;
      _.each(data, function(n) {
        $scope.photoObj = {};
        $scope.photoObj.src = $filter('serverimage')(n.src);
        $scope.photos.push($scope.photoObj);
      });
    });
    $ionicLoading.hide();

    $ionicModal.fromTemplateUrl('templates/galleryPopup.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function(data) {
      $scope.modalImage = data.image;
      console.log($scope.modalImage);
      // _.each($scope.mygalleryinside,function(data){
      // $scope.modalImage= data.image;
      // console.log($scope.modalImage);
      // })
      // $scope.modalImage = $scope.galleryinside.image;
      $scope.modal.show();
      console.log();
    };
    $scope.closeModal = function() {
      $scope.modal.hide();
    };

  })
  .controller('NotificationCtrl', function($scope, MyServices, $stateParams, $ionicLoading) {
    // $scope.galleryinside='';
    // MyServices.getGalleryInside($stateParams.id, function(data) {
    //   $scope.galleryinside = data;
    //   console.log('$scope.galleryinside', $scope.galleryinside);
    //   $scope.galleryinside = _.chunk($scope.galleryinside, 2);
    //
    // });
    globalFunction.loading();
    MyServices.getNotifications(function(data) {
      $ionicLoading.hide();
      $scope.Notifications = data;
      console.log($scope.Notifications.length);
      console.log('$scope.Notifications', $scope.Notifications);

    });




  })
  .controller('GalleryCtrl', function($scope, MyServices, $ionicLoading) {
    globalFunction.loading();
    MyServices.getGallery(function(data) {
      $ionicLoading.hide();
      $scope.gallery = data;
      console.log('$scope.gallery', $scope.gallery);
      $scope.gallery = _.chunk($scope.gallery, 2);
    });
    // $ionicLoading.hide();
  })

.controller('DownloadsCtrl', function($scope, MyServices, $ionicLoading, $filter) {
  globalFunction.loading();
  MyServices.getDownload(function(data) {
    $ionicLoading.hide();
    $scope.download = data;
    console.log('$scope.download', $scope.download);
    $scope.download = _.chunk($scope.download, 2);
  });

  var options = "location=no,toolbar=yes";
  var target = "_blank";
  var url = "";

  $scope.openPDF = function(link) {
    url = $filter('serverimage')(link);
    var ref = cordova.InAppBrowser.open(url, target, options);
  };

})

.controller('ProductCtrl', function($scope, $stateParams, $ionicModal, MyServices, $ionicLoading) {
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

  globalFunction.loading();
  MyServices.getAllProducts(function(data) {
    $ionicLoading.hide();
    $scope.brands = data;
    $scope.brands = _.chunk($scope.brands, 2);
    console.log('$scope.brands', $scope.brands);
  });

});
