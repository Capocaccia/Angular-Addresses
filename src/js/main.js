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
        controllerAs: 'main',
        private: true
      })
      .when('/people/new', {
        templateUrl: 'views/people.html',
        controller: 'NewPersonCtrl',
        controllerAs: 'main',
        private: true
      })
      .when('/people/:id', {
        templateUrl: 'views/person.html',
        controller: 'PersonController',
        controllerAs: 'main',
        private: true
      })
      .when('/people/:id/edit', {
        templateUrl: 'views/person.html',
        controller: 'EditPersonCtrl',
        controllerAs: 'main',
        private: true
      })

      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'auth',
        resolve: {
          checkLogin: function($rootScope, $location){
            if($rootScope.auth){
              $location.path('/people')
            }
          }
        }
      })

      .when('/logout', {
        template: '<h1>Logging out...</h1>',
        controller: 'LogoutCtrl'
      })

      .otherwise({
        templateUrl: 'views/404.html'
      });
  })

  .run(function ($rootScope, API_URL, $location) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
      if (nextRoute.$$route && nextRoute.$$route.private && !$rootScope.auth) {
        $location.path('/login')
      }
      var fb = new Firebase(API_URL);
      $rootScope.auth = fb.getAuth();
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

  .controller('LogoutCtrl', function ($rootScope, $scope, $location, API_URL) {
    var fb = new Firebase(API_URL);

    fb.unauth(function () {
      $rootScope.auth = null;
      $location.path('/login');
      $scope.$apply();
    });
  })

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

  .controller('EditPersonCtrl', function ($scope, $routeParams, $location, Person) {
    var vm = this;
    vm.id = $routeParams.id;

    if (!$rootScope.auth) {
      $location.path('/login');
    }

    vm.onModalLoad = function () {
      $('#modal').modal('show');

      $('#modal').on('hidden.bs.modal', function (e) {
        $location.path(`/people/${vm.id}`);
        $scope.$apply();
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

  .controller('Main', function ($rootScope, $location, Person) {
    var vm = this;

    if (!$rootScope.auth) {
      $location.path('/login');
    }

    Person.getAll(function (people) {
      vm.people = people;
    });

    vm.onModalLoad = function () {};
  });


