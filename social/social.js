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

  
  vm.opinions = {
    config: {
      onClick: function(o) {
        console.log(o);
      }
    }
  };

  api.getCriteria.then(function(res) {
    vm.criteria = res.data;
    $scope.$evalAsync();
  });
});
