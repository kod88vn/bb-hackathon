angular.module( 'bb.admin', ['auth0'])
.controller( 'AdminCtrl', function AdminController( $scope, $http, $location, store, auth, api) {
  var vm = this;
  vm.criteria;
  
  api.getCriteria.then(function(res) {
    vm.criteria = res.data;
    $scope.$evalAsync();
  });

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  }
});
