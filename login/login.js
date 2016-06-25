angular.module( 'sample.login', [
  'auth0'
])
.controller( 'LoginCtrl', function HomeController( $scope, auth, $location, store ) {

  // No longer needed due to Roles functionality in Auth0

  function getOptionsForRole(isAdmin, token) {
    if(isAdmin) {
      // TODO: update roles and principals based upon your account settings.
      return {
          'id_token': token,
          'role':'arn:aws:iam::012345678901:role/auth0-api-role',
          'principal': 'arn:aws:iam::012345678901:saml-provider/auth0'
        };
      }
    else {
      return {
          'id_token': token,
          'role':'arn:aws:iam::012345678901:role/auth0-api-social-role',
          'principal': 'arn:aws:iam::012345678901:saml-provider/auth0'
        };
    }
  }

  $scope.login = function() {
     var params = {
        authParams: {
          scope: 'openid email'
        }
      };

    auth.signin(params, function(profile, token) {

      store.set('profile', profile);
      store.set('token', token);

      // set admin and get delegation token from identity token.
      profile.isAdmin = !profile.identities[0].isSocial;
      var options = getOptionsForRole(profile.isAdmin, token);

      // TODO: Step 3: Enable this section once you setup AWS delegation.
      auth.getToken(options)
        .then(
          function(delegation)  {
             store.set('awstoken', delegation.Credentials);  // add to local storage
            $location.path(profile.isAdmin ? '/admin' : '/social/surveys/1235');
          },
        function(err) {
           console.log('failed to acquire delegation token', err);
      });


      // TODO: Step 3: Remove this redirect after you add the get token API.
      //$location.path('/');

    }, function(error) {
      console.log('There was an error logging in', error);
    });
  }
});
