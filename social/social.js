angular.module( 'bb.social', ['auth0'])
.controller( 'SocialCtrl', function SocialController( $scope, $http, $location, store, auth, api ) {
  var vm = this;
  vm.opinionModel = {};
  vm.comparables;

  $scope.$on('tos:updateWeight', function() {
    calculateCriteriaWeights(vm.criteria);
  });

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
        var q = [
          'Is',
          options[i].description,
          'more important to you than',
          options[j].description,
          '?'
        ].join(' ');
        questions.push({
          question: q,
          left: options[i],
          right: options[j]
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
            'Does',
            options[i].name,
            'align with your view more than',
            options[j].name,
            'on',
            c.description,
            '?'
          ].join(' ');

          surveys.push({
            question: q,
            left: options[i],
            right: options[j]
          });
        }
      }
    });

    return surveys;
  }

  function calculateCriteriaWeights(criteria) {
    let criteriaWeightMap = {};

    criteria.forEach(c => {
      c.weight = 0;
      criteriaWeightMap[c.id] = c;
    });

    vm.weightQuestions.forEach(o => {
      if(!o.opinion) {
        return;
      }

      let index = o.opinion.opinionIndex - 5;
      if(index > 0) {
        criteriaWeightMap[o.left.id].weight += index;
      } else {
        criteriaWeightMap[o.right.id].weight += - index;
      }
    });
  }

});
