angular.module( 'bb.logout', ['auth0'])
  .directive('bbLogout', bbLogout)
  .controller( 'LogoutCtrl', LogoutController)
  ;

function bbLogout() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      config: '='
    },
    templateUrl: '/_components/logout/logout.html',
    controller: 'LogoutCtrl',
    controllerAs: 'loc'
  }
}

function LogoutController( $scope, $http, $location, store, auth ) {
  var vm = this;
  vm.logout = logout;

  function logout() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
}
