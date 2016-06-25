angular.module( 'bb.social-criteria', ['auth0'])
  .directive('bbSocialCriteria', bbSocialCriteria)
  .controller( 'SocialCriteriaController', SocialCriteriaController);

function bbSocialCriteria() {
  return {
    restrict: 'E',
    scope: {
      model: '='
    },
    templateUrl: '/_components/social-criteria/social-criteria.html',
    controller: 'SocialCriteriaController',
    controllerAs: 'scrc'
  }
}

function SocialCriteriaController( $scope, $timeout, $http, $location, store, auth, api ) {
  var scrc = this;

  $scope.$watch('model', function(model) {
    if ($scope.model && $scope.model.map) {
      scrc.labels = $scope.model.map(function(crit) {
        return crit.description;
      });

      scrc.weights = [$scope.model.map(function(crit) {
        return crit.weight;
      })];
    }
  }, true);

  scrc.series = ['score'];
}
