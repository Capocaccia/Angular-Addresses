angular
  .module('angularAddresses', ['ngRoute'])

  .constant('API_URL', 'https://addressangular.firebaseio.com')

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html'
      })
      .when('/about', {
        templateUrl: 'views/about.html'
      })

      .when('/people', {
        templateUrl: 'views/people.html',
        controller: 'Main',
        controllerAs: 'main'
      })
      .when('/people/new', {
        templateUrl: 'views/people.html',
        controller: 'NewPersonCtrl',
        controllerAs: 'main'
      })
      .when('/people/:id', {
        templateUrl: 'views/person.html',
        controller: 'PersonController',
        controllerAs: 'main'
      })
      .when('/people/:id/edit', {
        templateUrl: 'views/person.html',
        controller: 'EditPersonCtrl',
        controllerAs: 'main'
      })

      .otherwise({
        templateUrl: 'views/404.html'
      });
  })

  .filter('objToArr', function () {
    return function (obj) {
      if (obj) {
        return Object
          .keys(obj)
          .map(function (key) {
            obj[key]._id = key;
            return obj[key];
          });
      }
    }
  })

  .filter('ransomcase', function () {
    return function (string) {
      return string
        .split('')
        .map(function (char, i) {
          return i % 2 ? char.toUpperCase() : char.toLowerCase();
        })
        .join('');
    }
  })

  .controller('PersonController', function ($routeParams, Person) {
    var vm = this;
    vm.id = $routeParams.id;

    Person.getOne(vm.id, function (data) {
      vm.person = data;
    });

    vm.destroy = function (id) {
      Person.destroy(vm.id, function () {
        window.location.href = '#/people';
      });
    };

    vm.onModalLoad = function () {};
  })

  .factory('Person', function ($http, API_URL) {
    return {
      getOne(id, cb) {
        $http
          .get(`${API_URL}/people/${id}.json`)
          .success(cb);
      },

      getAll(cb) {
        $http
          .get(`${API_URL}/people.json`)
          .success(cb);
      },

      create(data, cb) {
        $http
          .post(`${API_URL}/people.json`, data)
          .success(cb);
      },

      update(id, data, cb) {
        $http
          .put(`${API_URL}/people/${id}.json`, data)
          .success(cb);
      },

      destroy(id, cb) {
        $http
          .delete(`${API_URL}/people/${id}.json`)
          .success(cb);
      }
    }
  })

  .controller('NewPersonCtrl', function (Person) {
    var vm = this;

    vm.onModalLoad = function () {
      $('#modal').modal('show');

      $('#modal').on('hidden.bs.modal', function (e) {
        window.location.href = '#/people';
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

  .controller('EditPersonCtrl', function ($routeParams, Person) {
    var vm = this;
    vm.id = $routeParams.id;

    vm.onModalLoad = function () {
      $('#modal').modal('show');

      $('#modal').on('hidden.bs.modal', function (e) {
        window.location.href = `#/people/${vm.id}`;
      });
    };

    vm.saveAddress = function () {
      Person.update(vm.id, vm.person, function () {
        $('#modal').modal('hide');
      });
    };

    Person.getOne(vm.id, function (person) {
      vm.person = person;
    });
  })

  .controller('Main', function (Person) {
    var vm = this;

    Person.getAll(function (people) {
      vm.people = people;
    });

    vm.onModalLoad = function () {};
  });
