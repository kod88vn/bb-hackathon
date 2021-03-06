angular.module( 'sample', [
  'auth0',
  'ngRoute',
  'sample.login',
  'bb.admin',
  'bb.social',
  'angular-storage',
  'angular-jwt',
  'bb.logout',
  'bb.api',
  'bb.criteria',
  'bb.social-criteria',
  'bb.comparables',
  'bb.opinions',
  'bb.survey',
  'social-nav',
  'admin-nav',
  'chart.js'
])
.config( function myAppConfig ( $routeProvider, authProvider, $httpProvider, $locationProvider,
  jwtInterceptorProvider) {
  $routeProvider
    .when( '/', {
      redirectTo: '/login'
    })
    .when( '/admin', {
      controller: 'AdminCtrl',
      controllerAs: 'adc',
      templateUrl: 'admin/admin.html',
      pageTitle: 'Admin Page',
      requiresLogin: true
    })
    .when( '/social', {
      controller: 'SocialCtrl',
      controllerAs: 'soc',
      templateUrl: 'social/social.html',
      pageTitle: 'Social Page',
      requiresLogin: true
    })
    .when( '/social/surveys', {
      controller: 'SocialCtrl',
      controllerAs: 'soc',
      templateUrl: 'social/surveys.html',
      pageTitle: 'Social Page',
      requiresLogin: true
    })
    .when( '/social/surveys/:id', {
      controller: 'SocialCtrl',
      controllerAs: 'soc',
      templateUrl: 'social/survey.html',
      pageTitle: 'Social Page',
      requiresLogin: true
    })
    .when( '/login', {
      controller: 'LoginCtrl',
      templateUrl: 'login/login.html',
      pageTitle: 'Login'
    })
    .otherwise({
      redirectTo: '/login'
    });


  authProvider.init({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    loginUrl: '/login'
  });

  jwtInterceptorProvider.tokenGetter = function(store) {
    return store.get('token');
  }

  // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
  // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
  // want to check the delegation-token example
  $httpProvider.interceptors.push('jwtInterceptor');
}).run(function($rootScope, auth, store, jwtHelper, $location) {
  $rootScope.$on('$locationChangeStart', function() {
    if (!auth.isAuthenticated) {
      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          auth.authenticate(store.get('profile'), token);
        } else {
          $location.path('/login');
        }
      }
    }

  });
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$routeChangeSuccess', function(e, nextRoute){
    if ( nextRoute.$$route && angular.isDefined( nextRoute.$$route.pageTitle ) ) {
      $scope.pageTitle = nextRoute.$$route.pageTitle + ' | Auth0 Sample' ;
    }
  });
})

;
