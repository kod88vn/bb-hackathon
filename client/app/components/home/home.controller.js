class HomeController {
  constructor() {
    this.name = 'home';
    this.typistConfig = {
      words: ['Angular ES6 Boilerplate', 'Have a nice day!'],
      id: 'typist',
      typeSpeed: 50,
      deleteSpeed: 50,
      pauseDelay: 500,
      loop: true,
      postfix: ''
    };
  }
}

export default HomeController;
