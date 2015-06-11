angular
  .module('angularAddresses')

  .controller('PersonController', function ($routeParams, $location, Person) {
    var vm = this;
    vm.id = $routeParams.id;

    Person.getOne(vm.id, function (data) {
      vm.person = data;
    });

    vm.destroy = function (id) {
      Person.destroy(vm.id, function () {
        $location.path('/people');
      });
    };

    vm.onModalLoad = function () {};
  });
