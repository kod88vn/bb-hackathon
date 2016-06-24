import template from './comparables.pug';
import controller from './comparables.controller';
import './comparables.styl';

let comparablesComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default comparablesComponent;
