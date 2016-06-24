angular.module( 'bb.social', ['auth0'])
.controller( 'SocialCtrl', function SocialController( $scope, $http, $location, store, auth, api ) {
  api.getComparables.then(function(res) {
    console.log(res.data);
  });
});
