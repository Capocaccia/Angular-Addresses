angular
  .module('angularAddresses')

  .controller('LoginCtrl', function ($rootScope, $scope, $location, API_URL) {
      var vm = this;

      if($rootScope.auth){
        $location.path('/people')
      }

      vm.login = function () {
        var fb = new Firebase(API_URL);

        fb.authWithPassword({
          email: vm.email,
          password: vm.password
        }, function (err, authData) {
          if (err) {
            console.log('Error', err)
          } else {
            $rootScope.auth = authData;
            $location.path('/people');
            $scope.$apply();
          }
        });

      };

      vm.register = function () {};
    })
