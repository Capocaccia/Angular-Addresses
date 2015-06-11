angular
  .module('angularAddresses')

  .run(function ($rootScope, API_URL, $location) {
  $rootScope.$on('$routeChangeStart', function (event, nextRoute) {
    if (nextRoute.$$route && nextRoute.$$route.private && !$rootScope.auth) {
      $location.path('/login')
    }
    var fb = new Firebase(API_URL);
    $rootScope.auth = fb.getAuth();
  });
});
