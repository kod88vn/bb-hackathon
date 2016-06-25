angular.module( 'admin-nav', ['auth0'])
  .directive('adminNav', adminNav)
  .controller( 'AdminNavController', AdminNavController);

function adminNav() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/_components/admin-nav/admin-nav.html',
    controller: 'AdminNavController',
    controllerAs: 'ctrl'
  }
}

function AdminNavController( $scope, $http, $location, store, auth ) {
  this.items = [
    {url: '/#/admin', title: 'Home'}
  ];
}
