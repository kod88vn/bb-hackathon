import angular from 'angular';
import uiRouter from 'angular-ui-router';
import criteriaComponent from './criteria.component';

let criteriaModule = angular.module('criteria', [
  uiRouter
])

.component('criteria', criteriaComponent);

export default criteriaModule;
