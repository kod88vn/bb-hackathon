import angular from 'angular';
import uiRouter from 'angular-ui-router';
import comparableComponent from './comparable.component';

let comparableModule = angular.module('comparable', [
  uiRouter
])

.component('comparable', comparableComponent);

export default comparableModule;
