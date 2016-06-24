import angular from 'angular';
import uiRouter from 'angular-ui-router';
import surveysComponent from './surveys.component';

let surveysModule = angular.module('surveys', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('surveys', {
      url: '/surveys',
      template: '<surveys></surveys>'
    });
})

.component('surveys', surveysComponent);

export default surveysModule;
