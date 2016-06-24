angular.module( 'bb.social', ['auth0'])
.controller( 'SocialCtrl', function SocialController( $scope, $http, $location, store, auth, api ) {
  var vm = this;
  vm.opinionModel = {};
  vm.comparables;

  api.getComparables.then(function(res) {
    console.log(res.data);
    vm.comparables = res.data;
    $scope.$evalAsync();
  });

  api.getCriteria.then(function(res) {
    vm.criteria = res.data;
    vm.weightQuestions = computeWeightSurveys(vm.criteria);
    $scope.$evalAsync();
  });

  // function composeQuestions(criteria) {
  //   criteria.forEach(function(c) {

  //   });
  // }

  function computeWeightSurveys(criteria) {
    let questions = [];
    let options = criteria;

    for(let i = 0; i < options.length - 1; i++) {
      for(let j = i +1; j < options.length; j++) {
        var q = ['Is', options[i].description, 'more important than', options[j].description, '?'].join(' ');
        questions.push({
          question: q
        });
      }
    }

    return questions;
  }

});
