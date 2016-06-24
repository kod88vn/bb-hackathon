angular.module( 'bb.api', [])
  .factory('api', api)
  ;

function api($http, $q) {
  var clientInfo = {
    region: 'eu-west-1'
  };
  var apigClient = apigClientFactory.newClient(clientInfo);

  function getComparables() {
    var deferred = $q.defer();
  }

  return {
    getComparables: apigClient.comparablesGet({},{})
  }
}

