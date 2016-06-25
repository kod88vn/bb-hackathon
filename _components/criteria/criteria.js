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
  vm.config = $scope.config;

  vm.labels = vm.criteria.map(function(crit) {
    return crit.description;
  });

  vm.weights = [vm.criteria.map(function(crit) {
    return crit.weight;
  })]
  
  vm.addCriterion = function() {
    api.addCriterion.then(function(){
      
    });
  }

  vm.series = ['Score'];
}
