angular.module( 'bb.social', ['auth0'])
.controller( 'SocialCtrl', function SocialController( $scope, $http, $location, store, auth, api ) {
  var vm = this;
  vm.opinionModel = {};
  vm.comparables;

  api.getComparables.then(function(res) {
    vm.comparables = res.data;
    composeQuestions();
    $scope.$evalAsync();
  });

  api.getCriteria.then(function(res) {
    vm.criteria = res.data;
    vm.weightQuestions = computeWeightSurveys(vm.criteria);
    composeQuestions();
    $scope.$evalAsync();
  });

  function composeQuestions() {
    if(vm.comparables && vm.criteria) {
      vm.candidateQuestions = computeCandidateSurveys(vm.criteria, vm.comparables);
    }
  }

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

  function computeCandidateSurveys(criteria, comparables) {
    let surveys = [];
    let options = comparables;

    criteria.forEach(c => {
      for(let i = 0; i < options.length - 1; i++) {
        for(let j = i +1; j < options.length; j++) {
          let q = [
            'Is',
            options[i].name,
            'more important than',
            options[j].name,
            'on',
            c.description,
            '?'
          ].join(' ');

          surveys.push({
            question: q
          });
        }
      }
    });

    return surveys;
  }

});
