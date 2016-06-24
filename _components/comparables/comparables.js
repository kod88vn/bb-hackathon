angular.module( 'bb.comparables', ['auth0'])
  .directive('bbComparables', bbcomparables)
  .controller( 'comparablesCtrl', comparablesController)
  ;

function bbcomparables() {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: '/_components/comparables/comparables.html',
    controller: 'comparablesCtrl',
    controllerAs: 'cmp'
  }
}

function comparablesController( $scope, $http, $location, store, auth ) {
  var vm = this;
  console.log(vm.comparables);
  vm.comparables = $scope.model;
}
