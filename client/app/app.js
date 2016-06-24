import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import 'ng-typist/dist/app';
import 'normalize.css';
// import auth0 from 'auth0-angular';
// import lock from 'auth0-lock';
// import cookies from 'angular-cookies';
// import storage from 'angular-storage';
// import jwt from 'angular-jwt';
import * as apig from '../apigClient';
import '../auth0-variables';

angular.module('app', [
    uiRouter,
    Common.name,
    Components.name,
    'ng-typist',
    'auth0',
    'angular-storage',
    'angular-jwt'
  ])
  .config(($locationProvider, $httpProvider, authProvider, jwtInterceptorProvider) => {
    "ngInject";
    $locationProvider.html5Mode(true).hashPrefix('!');

    authProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      loginUrl: '/login'
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function($rootScope, auth, store, jwtHelper, $location) {
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

    })
  })

  .component('app', AppComponent);

