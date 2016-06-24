angular.module( 'bb.admin', ['auth0'])
.controller( 'AdminCtrl', function AdminController( $scope, $http, $location, store, auth ) {

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
});
