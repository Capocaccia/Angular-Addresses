angular
  .module('angularAddresses')
  .config(function ($routeProvider) {
  $routeProvider

    .when('/people', {
      templateUrl: 'assets/people/people.html',
      controller: 'PeopleCtrl',
      controllerAs: 'main',
      private: true
    })
    .when('/people/new', {
      templateUrl: 'assets/people/people.html',
      controller: 'NewPersonCtrl',
      controllerAs: 'main',
      private: true
    })
    .when('/people/:id', {
      templateUrl: 'assets/people/person.html',
      controller: 'PersonController',
      controllerAs: 'main',
      private: true
    })
    .when('/people/:id/edit', {
      templateUrl: 'assets/people/person.html',
      controller: 'EditPersonCtrl',
      controllerAs: 'main',
      private: true
    })
});
