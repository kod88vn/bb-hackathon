import angular from 'angular';
import uiRouter from 'angular-ui-router';
import comparablesComponent from './comparables.component';

let comparablesModule = angular.module('comparables', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('comparables', {
      url: '/comparables',
      template: '<comparables></comparables>'
    });
})

.component('comparables', comparablesComponent);

export default comparablesModule;
