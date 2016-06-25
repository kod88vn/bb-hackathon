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
  vm.comparables = $scope.model;

  console.log(vm.comparables);

  vm.getColClass = function() {
    return 'col-sm-' + (12 / vm.comparables.length);
  };

  vm.view = function(comparable, e) {
    e.preventDefault();
    vm.isModalOpen = true;
    vm.viewComparable = comparable;
  };

  vm.closeModal = function(e) {
    e.preventDefault();
    vm.isModalOpen = false;
  };
}
