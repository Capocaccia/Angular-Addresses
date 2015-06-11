angular
  .module('angularAddresses')

  .controller('LogoutCtrl', function ($rootScope, $scope, $location, API_URL) {
    var fb = new Firebase(API_URL);

    fb.unauth(function () {
      $rootScope.auth = null;
      $location.path('/login');
      $scope.$apply();
    });
  })
