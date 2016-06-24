import template from './navbarside.pug';
import controller from './navbarside.controller';
import './navbarside.styl';

let navbarsideComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default navbarsideComponent;
