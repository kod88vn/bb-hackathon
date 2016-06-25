angular.module( 'social-nav', ['auth0'])
  .directive('socialNav', socialNav)
  .controller( 'SocialNavController', SocialNavController);

function socialNav() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: '/_components/social-nav/social-nav.html',
    controller: 'SocialNavController',
    controllerAs: 'ctrl'
  }
}

function SocialNavController( $scope, $http, $location, store, auth ) {
  this.items = [
    {url: '/#/social', title: 'Home'},
    {url: '/#/social/surveys', title: 'Surveys'}
  ];
}
