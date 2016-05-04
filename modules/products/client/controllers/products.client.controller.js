(function () {
  'use strict';

  // Products controller
  angular
    .module('products')
    .controller('ProductsController', ProductsController);

  ProductsController.$inject = ['$scope', '$state', 'Authentication', 'productResolve', '$timeout', '$window', 'FileUploader', '$sce'];

  function ProductsController ($scope, $state, Authentication, product, $timeout, $window, FileUploader, $sce) {
    var vm = this;

    vm.authentication = Authentication;
    vm.product = product;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.urlPreview = $sce.trustAsResourceUrl('https://books.google.co.id/books?id='+vm.product.googleId+'&lpg=PP1&pg=PP1&output=embed');

    var defImage = 'modules/products/client/img/book.png';
    if (vm.product.imageUrl === undefined) {
      vm.product.imageUrl = defImage;
      vm.product.images = [];
      vm.product.images.push(defImage);
    } else {
      defImage = vm.product.imageUrl;
    }

    // Create file uploader instance
    $scope.uploader = new FileUploader({
      url: 'api/productspicture',
      alias: 'newProductPicture'
    });

    // Set file uploader image filter
    $scope.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    $scope.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            //vm.product.imageUrl = fileReaderEvent.target.result;
            vm.product.images.push(fileReaderEvent.target.result);
            $scope.uploadProfilePicture();
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      $scope.success = true;
      vm.product.images[vm.product.images.length-1] = response.imageURL;
      //vm.product.imageUrl = response.imageURL;
      $scope.uploader.clearQueue();
    };

    // Called after the user has failed to uploaded a new picture
    $scope.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      $scope.cancelUpload();

      // Show error message
      $scope.error = response.message;
    };

    // Change user profile picture
    $scope.uploadProfilePicture = function () {
      // Clear messages
      $scope.success = $scope.error = null;

      // Start upload
      $scope.uploader.uploadAll();
    };

    // Cancel the upload process
    $scope.cancelUpload = function () {
      $scope.uploader.clearQueue();
      vm.product.images.splice(vm.product.images.length-1,1);
      //vm.product.imageUrl = defImage;
    };

    $scope.cancelUpload2 = function(img){
      vm.product.images.splice(vm.product.images.length-1,1);
      $scope.uploader.clearQueue();
    };

    // Remove existing Product
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.product.$remove($state.go('products.list'));
      }
    }

    // Save Product
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      $scope.success = $scope.error = null;
      // Start upload
      $scope.uploader.uploadAll();

      // TODO: move create/update logic to service
      if (vm.product._id) {
        vm.product.$update(successCallback, errorCallback);
      } else {
        vm.product.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('products.view', {
          productId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
