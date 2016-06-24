import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Comparables from './comparables/comparables';
import Surveys from './surveys/surveys';
import AddSurvey from './surveys/addsurvey/addsurvey';

let componentModule = angular.module('app.components', [
  Home.name,
  About.name,
  Comparables.name,
  Surveys.name,
  AddSurvey.name
]);

export default componentModule;
