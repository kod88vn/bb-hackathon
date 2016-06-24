import template from './addsurvey.pug';
import controller from './addsurvey.controller';
import './addsurvey.styl';

let addsurveyComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default addsurveyComponent;
