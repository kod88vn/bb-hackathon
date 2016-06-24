import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Criteria from './criteria/criteria';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Criteria.name
]);

export default componentModule;
