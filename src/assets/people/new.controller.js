angular
  .module('angularAddresses')

  .controller('NewPersonCtrl', function ($location, $scope, Person) {
      var vm = this;

      vm.onModalLoad = function () {
        $('#modal').modal('show');

        $('#modal').on('hidden.bs.modal', function (e) {
          $location.path('/people');
          $scope.$apply();
        });
      };

      vm.saveAddress = function () {
        Person.create(vm.person, function () {
          $('#modal').modal('hide');
        });
      };

      Person.getAll(function (people) {
        vm.people = people;
      });
    })
