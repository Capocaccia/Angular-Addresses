angular
  .module('angularAddresses')

  .controller('PeopleCtrl', function ($rootScope, $location, Person) {
    var vm = this;

    if (!$rootScope.auth) {
      $location.path('/login');
    }

    Person.getAll(function (people) {
      vm.people = people;
    });

    vm.onModalLoad = function () {};
  });
