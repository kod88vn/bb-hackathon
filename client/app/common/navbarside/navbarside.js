import angular from 'angular';
import uiRouter from 'angular-ui-router';
import navbarsideComponent from './navbarside.component';

let navbarsideModule = angular.module('navbarside', [
  uiRouter
])

.component('navbarside', navbarsideComponent);

export default navbarsideModule;
