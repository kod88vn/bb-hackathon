import template from './comparable.pug';
import controller from './comparable.controller';
import './comparable.styl';

let comparableComponent = {
  restrict: 'E',
  bindings: {
    "comparables" : "="
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default comparableComponent;