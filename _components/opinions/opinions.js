angular.module( 'bb.opinions', [])
  .directive('bbOpinions', bbOpinions)
  .controller( 'OpinionsCtrl', OpinionsController)
  ;

function bbOpinions() {
  return {
    restrict: 'E',
    scope: {
      model: '=',
      config: '=',
      click: '&'
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
    {description: 'Strongly Disagree', opinionIndex: 1},
    {description: 'Much Disagree', opinionIndex: 2},
    {description: 'Disagree', opinionIndex: 3},
    {description: 'Slightly Disagree', opinionIndex: 4},
    {description: 'Neutral', opinionIndex: 5},
    {description: 'Slightly Agree', opinionIndex: 6},
    {description: 'Agree', opinionIndex: 7},
    {description: 'Much Agree', opinionIndex: 8},
    {description: 'Strongly Agree', opinionIndex: 9}
  ];

  function onClick(opinion) {
    $scope.model.opinion = opinion;

    if($scope.config && $scope.config.onClick) {
      $scope.config.onClick(opinion);
    }

    if($scope.click) {
      $scope.click();
    }

    $rootScope.$broadcast('tos:update')
  }
}
