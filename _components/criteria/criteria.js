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
  vm.newCriterionObject = {};
  vm.newDescription;

  vm.labels = vm.criteria.map(function(crit) {
    return crit.description;
  });

  vm.weights = [vm.criteria.map(function(crit) {
    return crit.weight;
  })]
  
  vm.addCriterion = function() {
    var criteria = [];
    var newCriterion = {};
    vm.newCriterionObject.group = 'default';
    newCriterion.weight = 0;
    newCriterion.id = 5;
    newCriterion.description = vm.newDescription;
    
    criteria.push(newCriterion);
    vm.newCriterionObject.criteria = criteria;
    
    api.postCriteria({},  vm.newCriterionObject).then(function(res){
      console.log(res.data);
    });
  }

  vm.series = ['Score'];
}
