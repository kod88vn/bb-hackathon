class NavbarsideController {
  constructor() {
    this.name = 'navbarside';
  }

  isActiveTab(value) {
    var location = window.location.pathname.toLowerCase().substring(0, value.length);

    if(location === value.toLowerCase()) {
      return true;
    }

    return false;
  }
}

export default NavbarsideController;
