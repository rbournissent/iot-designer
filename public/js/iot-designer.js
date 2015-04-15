(function() {
  'use strict';

  angular
    .module('iotDesigner', []);
})();

(function() {
  'use strict';

  angular
    .module('iotDesigner')
    .controller('DashboardController', DashboardController);

  function DashboardController($scope, $http) {
    var vm = this;
    vm.title = 'DashboardController';
    $scope.user = JSON.parse(localStorage.getItem('user'));

    if(!$scope.user) {
      window.location.href = 'login.html';
    }

    $http.get('data/projects.json')
      .success(function(data) {
        $scope.projects = data;
      });

    $http.get('data/flows.json')
      .success(function(data) {
        $scope.flows = data;
      });

    $scope.removeProject = function(index) {
      $scope.projects.splice(index, 1);
    }

    $scope.logout = function() {
      localStorage.removeItem('user');
      window.location.href = "login.html";
    }

  }
})();