import AddsurveyModule from './addsurvey'
import AddsurveyController from './addsurvey.controller';
import AddsurveyComponent from './addsurvey.component';
import AddsurveyTemplate from './addsurvey.html';

describe('Addsurvey', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AddsurveyModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AddsurveyController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(AddsurveyTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AddsurveyComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AddsurveyTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AddsurveyController);
      });
  });
});
