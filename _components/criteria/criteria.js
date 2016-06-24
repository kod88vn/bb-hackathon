angular.module( 'bb.criteria', ['auth0'])
  .directive('bbCriteria', bbcriteria)
  .controller( 'criteriaCtrl', criteriaController)
  ;

function bbcriteria() {
  return {
    restrict: 'E',
    scope: {
      config: '=',
      model: '='
    },
    templateUrl: '/_components/criteria/criteria.html',
    controller: 'criteriaCtrl',
    controllerAs: 'crc'
  }
}

function criteriaController( $scope, $http, $location, store, auth, api ) {
  var vm = this;

  vm.criteria = $scope.model;
}
