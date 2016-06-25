angular.module( 'bb.criteria', ['auth0'])
  .directive('bbCriteria', bbCriteria)
  .controller( 'criteriaCtrl', criteriaController)
  ;

function bbCriteria() {
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
  vm.addCriterion = addCriterion;
  vm.removeCriterion = removeCriterion;
  vm.newDescription;

  vm.labels = vm.criteria.map(function(crit) {
    return crit.description;
  });

  vm.weights = [vm.criteria.map(function(crit) {
    return crit.weight;
  })];

  function removeCriterion(criterion) {
    var payload = {
      criteria: [criterion],
      group: 'default'
    };

    api.deleteCriteria({}, payload).then(function(res){
      if(res.status === 200) {
        for(var i = 0; i < vm.criteria.length; i++) {
          if (vm.criteria[i].id === criterion.id) {
            index = i;
            break;
          }
        }

        if (index > -1) {
          vm.criteria.splice(index, 1);
          $scope.$evalAsync();
        }
      }
    });
  }

  function addCriterion() {
    var criteria = [];
    var newCriterion = {
      description: vm.newDescription,
      weight: 0
    };
    var payload = {
      criteria: [newCriterion],
      group: 'default'
    };

    criteria.push(newCriterion);
    vm.newCriterionObject.criteria = criteria;

    api.postCriteria({}, payload).then(function(res){
      vm.newDescription = '';
      if(res.status !== 200) {
        return;
      }

      vm.criteria.splice(0, vm.criteria.length);
      api.getCriteria().then(function(res) {
        vm.criteria = vm.criteria.concat(res.data);
        $scope.$evalAsync();
      });
    });
  }

  vm.series = ['Score'];
}
