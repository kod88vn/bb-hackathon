import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Comparable from './comparable/comparable'
import Criterion from './criteria/criteria'

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Comparable.name,
  Criterion.name
]);

export default componentModule;
