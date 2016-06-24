import template from './surveys.pug';
import controller from './surveys.controller';
import './surveys.styl';

let surveysComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default surveysComponent;
