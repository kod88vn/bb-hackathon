angular.module( 'bb.opinions', [])
  .directive('bbOpinions', bbOpinions)
  .controller( 'OpinionsCtrl', OpinionsController)
  ;

function bbOpinions() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      config: '='
    },
    templateUrl: '/_components/opinions/opinions.html',
    controller: 'OpinionsCtrl',
    controllerAs: 'opc'
  }
}

function OpinionsController($scope, $rootScope) {
  var vm = this;
  vm.onClick = onClick;

  vm.opinionOptions = [
    {description: '1 - Strongly Disagree', opinionIndex: 1},
    {description: '2 - Much Disagree', opinionIndex: 2},
    {description: '3 - Disagree', opinionIndex: 3},
    {description: '4 - Slightly Disagree', opinionIndex: 4},
    {description: '5 - Neutral', opinionIndex: 5},
    {description: '6 - Slightly Agree', opinionIndex: 6},
    {description: '7 - Agree', opinionIndex: 7},
    {description: '8 - Much Agree', opinionIndex: 8},
    {description: '9 - Strongly Agree', opinionIndex: 9}
  ];

  function onClick(opinion) {
    $scope.model.opinion = opinion;
    if($scope.config && $scope.config.onClick) {
      $scope.config.onClick(opinion);
    }

    $rootScope.$broadcast('tos:updateWeight')
  }
}
