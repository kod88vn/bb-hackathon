import NavbarsideModule from './navbarside'
import NavbarsideController from './navbarside.controller';
import NavbarsideComponent from './navbarside.component';
import NavbarsideTemplate from './navbarside.html';

describe('Navbarside', () => {
  let $rootScope, makeController;

  beforeEach(window.module(NavbarsideModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new NavbarsideController();
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
      expect(NavbarsideTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = NavbarsideComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(NavbarsideTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(NavbarsideController);
      });
  });
});
