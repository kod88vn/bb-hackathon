angular.module( 'survey', ['auth0'])
  .directive('survey', Survey)
  .controller( 'SurveyController', SurveyController);

function Survey() {
  return {
    restrict: 'E',
    scope: {
      questions: '='
    },
    templateUrl: '/_components/survey/survey.html',
    controller: 'SurveyController',
    controllerAs: 'ctrl'
  }
}

function SurveyController( $scope, $http, $location, store, auth ) {
  this.weights = [
    {text: 'NO!', weight: 0},
    {text: 'Maybe', weight: 1},
    {text: 'Normal', weight: 2},
    {text: 'Kinda', weight: 3},
    {text: 'Yes', weight: 4},
    {text: 'Ofc', weight: 5},
    {text: 'Strongly', weight: 6}
  ];

  //remap because directive uses ctrl handle
  this.questions = $scope.questions;
}
