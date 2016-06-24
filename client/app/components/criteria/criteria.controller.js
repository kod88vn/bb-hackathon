class CriteriaController {
  constructor() {
    this.name = 'criteria';
    
    this.deleteCriterion = function(id) {
      console.log("remove criterion with id" + id);
    }
  }
}

export default CriteriaController;
