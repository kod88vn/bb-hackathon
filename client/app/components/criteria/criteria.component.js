import template from './criteria.pug';
import controller from './criteria.controller';
import './criteria.styl';

let criteriaComponent = {
  restrict: 'E',
  bindings: {
    "criteria" : "="
  },
  template,
  controller,
  controllerAs: 'vm'
};

export default criteriaComponent;
