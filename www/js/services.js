var adminbase = "http://europratik.com/admin";
var adminurl = adminbase + "/index.php/json/";
var imgpath = adminbase + "/uploads/";


var foods = [];

angular.module('starter.services', [])
  .factory('MyServices', function($http) {
    return {
      all: function() {
        return chats;
      },
      remove: function(chat) {
        chats.splice(chats.indexOf(chat), 1);
      },
      get: function(chatId) {
        for (var i = 0; i < chats.length; i++) {
          if (chats[i].id === parseInt(chatId)) {
            return chats[i];
          }
        }
        return null;
      },
      signup: function(signup, callback) {
        return $http({
          url: adminurl + 'signup',
          method: "POST",
          data: {
            'username': signup.username,
            'email': signup.email,
            'password': signup.password,
            'dob': signup.dob
          }
        }).success(callback);
      },
      signin: function(signin, callback) {
        return $http({
          url: adminurl + 'signin',
          method: "POST",
          data: {
            'username': signin.username,
            'password': signin.password
          }
        }).success(callback);
      },
      authenticate: function() {
        return $http({
          url: adminurl + 'authenticate',
          method: "POST"
        });
      },
      logout: function() {
        return $http({
          url: adminurl + 'logout',
          method: "POST"
        });
      },
      getSlider: function(callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getSlider',
          method: "GET"
        }).success(callback);
      },
      getHomePics: function(callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getHomePageImage',
          method: "GET"
        }).success(callback);
      },
      getExclusiveProduct: function(callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getExclusivePdt',
          method: "GET"
        }).success(callback);
      },
      getPopularPdts: function(callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getPopularProduct',
          method: "GET"
        }).success(callback);
      },
      getAllProducts: function(callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getAllCategories',
          method: "GET"
        }).success(callback);
      },
      getEachCategory: function(id, callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getCategoryById?id=' + id,
          method: "GET"
        }).success(callback);
      },
      contactSubmit: function(formData, callback) {
        // console.log('form data: ', formData);
        $http({
          url: adminurl + 'contactUs',
          method: 'POST',
          withCredentials: true,
          data: formData
            // data: {
            //   "email": formData.email,
            //  "telephone": formData.telephone,
            //   "comment": formData.comment,
            //   "fname": formData.fname,
            //   "lname":formData.lname
            // }
        }).success(callback);
      },

      getGallery: function(callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getAllCategories',
          method: "GET"
        }).success(callback);
      },

      getDownload: function(callback) {
        // $http.get(adminurl + 'getSlider').success(callback);
        return $http({
          url: adminurl + 'getDownload',
          method: "GET"
        }).success(callback);
      },
      // getGalleryInside: function(id,callback) {
      //   // $http.get(adminurl + 'getSlider').success(callback);
      //   return $http({
      //     url: adminurl + 'getEachProductGallery?id' + id,
      //     method: "GET"
      //   }).success(callback);
      // }

      getGalleryInside: function(id,callback) {
        $http.get(adminurl + 'getEachProductGallery?id='+id ).success(callback);
      },
      getsearchresult: function(obj, callback) {
        // console.log('Name:', name);
        $http.get(adminurl + 'searchByCategory?name=' + obj.name + '&pageno='+obj.pageno).success(callback);
      },
      getSeries: function(id,callback) {
        $http.get(adminurl + 'series?id='+id ).success(callback);
      },
      getEachSeriesPdts: function(obj, callback) {
        $http.get(adminurl + 'getProductsByCategory?categoryid=' + obj.id + "&subcategories=" + obj.subcat + "&pageno=" + obj.pagenumber).success(callback);
      },
      getAllProductsDetail: function(obj, callback) {
        $http.get(adminurl + 'getProductsByCategory?categoryid=' + obj.id + "&subcategories=" + obj.subcat + "&pageno=" + obj.pagenumber+"&maxrow=100000").success(callback);
      },
      // getEachSeriesPdts: function(id, code, callback) {
      //
      //   $http.get(adminurl + 'getProductsByCategory?categoryid=' + id + '&subcategories=' + code).success(callback);
      // },
      getEachSeries: function(id, callback) {
        // console.log('Code: ', id);
        // console.log('Code: ', id);
        $http.get(adminurl + 'getProductsByCategory?categoryid=' + id).success(callback);
      },

          getAllSeries: function(callback) {
            // console.log('in all series');
            $http.get(adminurl + 'getAllSeries').success(callback);
          },

          subscribe: function(email, callback) {
            // console.log(mail);
            $http.get(adminurl + 'getSubscribers?email=' + email).success(callback);
          },

          getProductDetail: function(id,callback) {
            $http.get(adminurl + 'getProductDetail?id='+id ).success(callback);
          },
          getNotifications: function(callback) {
            // $http.get(adminurl + 'getSlider').success(callback);
            return $http({
              url: adminurl + 'getNotification',
              method: "GET"
            }).success(callback);
          },

              getEachSeries: function(id, callback) {
                // console.log('Code: ', id);
                // console.log('Code: ', id);
                $http.get(adminurl + 'getProductsByCategory?categoryid=' + id).success(callback);
              },
              getEachCategory: function(id, callback) {
                // console.log('nsId: ', id);
                $http.get(adminurl + 'getCategoryById?id=' + id).success(callback);
              },



    };
  });
