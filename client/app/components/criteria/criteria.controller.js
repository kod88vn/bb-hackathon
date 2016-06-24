class CriteriaController {
  constructor() {
    this.name = 'criteria';
    
    this.deleteCriterion = function(id) {
      console.log("delete criterion with ID" + id);
    }
  }
}

export default CriteriaController;
