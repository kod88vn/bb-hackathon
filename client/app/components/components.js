import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Comparable from './comparable/comparable'

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Comparable.name
]);

export default componentModule;
