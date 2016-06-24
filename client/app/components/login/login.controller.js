class LoginController {
  constructor(auth, store) {
    'ngInject';
    this.name = 'Auth0 Example';
    this.auth = auth;
    this.store = store;
  }

  login() {
    var params = {
      authParams: {
        scope: 'openid email'
      }
    };

    this.auth.signin(params, function(profile, token) {

      this.store.set('profile', profile);
      this.store.set('token', token);

      // set admin and get delegation token from identity token.
      profile.isAdmin = !profile.identities[0].isSocial;
      var options = getOptionsForRole(profile.isAdmin, token);

      // TODO: Step 3: Enable this section once you setup AWS delegation.
      this.auth.getToken(options)
        .then(
          function(delegation)  {
             this.store.set('awstoken', delegation.Credentials);  // add to local storage
            $location.path("/");
          },
        function(err) {
           console.log('failed to acquire delegation token', err);
      });
    }, function(error) {
      console.log("There was an error logging in", error);
    });
  }

  getOptionsForRole(isAdmin, token) {
    if(isAdmin) {
      // TODO: update roles and principals based upon your account settings.
      return {
          "id_token": token,
          "role":"arn:aws:iam::012345678901:role/auth0-api-role",
          "principal": "arn:aws:iam::012345678901:saml-provider/auth0"

        };
      }
    else {
      return {
          "id_token": token,
          "role":"arn:aws:iam::012345678901:role/auth0-api-social-role",
          "principal": "arn:aws:iam::012345678901:saml-provider/auth0"
        };
    }
  }
}

export default LoginController;
