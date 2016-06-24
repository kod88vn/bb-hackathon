import angular from 'angular';
import uiRouter from 'angular-ui-router';
import addsurveyComponent from './addsurvey.component';

let addsurveyModule = angular.module('addsurvey', [
  uiRouter
])

.config(($stateProvider) => {
  "ngInject";
  $stateProvider
    .state('addsurvey', {
      url: '/surveys/add',
      template: '<addsurvey></addsurvey>'
    });
})

.component('addsurvey', addsurveyComponent);

export default addsurveyModule;
