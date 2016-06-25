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
  var vm = this;

  vm.questions = $scope.model;
}
