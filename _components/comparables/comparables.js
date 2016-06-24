angular.module( 'bb.comparables', ['auth0'])
  .directive('bbComparables', bbcomparables)
  .controller( 'comparablesCtrl', comparablesController)
  ;

function bbcomparables() {
  return {
    restrict: 'E',
    scope: {
      config: '='
    },
    templateUrl: '/_components/comparables/comparables.html',
    controller: 'comparablesCtrl',
    controllerAs: 'cmp'
  }
}

function comparablesController( $scope, $http, $location, store, auth ) {
  var vm = this;
}
