import angular from 'angular';
import Navbar from './navbar/navbar';
import NavbarSide from './navbarside/navbarside';

let commonModule = angular.module('app.common', [
  Navbar.name,
  NavbarSide.name
]);

export default commonModule;
