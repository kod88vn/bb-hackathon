angular.module( 'bb.survey', [])
  .directive('bbSurvey', bbSurvey)
  .controller( 'surveyCtrl', surveyController)
  ;

function bbSurvey() {
  return {
    restrict: 'E',
    scope: {
      config: '=',
      model: '='
    },
    templateUrl: '/_components/survey/survey.html',
    controller: 'surveyCtrl',
    controllerAs: 'svc'
  }
}

function surveyController( $scope, $http, $location, store, auth, api ) {
  var vm = this, currentIndex = 0;

  $scope.$watch('model', function() {
    vm.questions = $scope.model;
    vm.active = vm.questions[currentIndex];
  }, true);

  $scope.$on('tos:getScores', function(event, comparables) {
    vm.comparables = comparables;
    var scores = comparables.map(c => c.score);
    var total = scores.reduce((pre, cur) => {return pre + cur});
    vm.comparables.forEach(c => {
      c.ratio = (c.score / total * 100).toFixed(2);
    });
  });

  vm.next = function() {
    var nextIndex = currentIndex + 1;

    if (nextIndex >= vm.questions.length) {
      vm.finished = true;
      //submit
    } else {
      vm.active = vm.questions[nextIndex];
      vm.loaded = (nextIndex + 1) / vm.questions.length * 100;
      currentIndex = nextIndex;
    }
  };
}
