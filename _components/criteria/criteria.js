angular.module( 'bb.criteria', ['auth0'])
  .directive('bbCriteria', bbcriteria)
  .controller( 'criteriaCtrl', criteriaController)
  ;

function bbcriteria() {
  return {
    restrict: 'E',
    scope: {
      config: '='
    },
    templateUrl: '/_components/criteria/criteria.html',
    controller: 'criteriaCtrl',
    controllerAs: 'crc'
  }
}

function criteriaController( $scope, $http, $location, store, auth ) {
  var vm = this;
}
