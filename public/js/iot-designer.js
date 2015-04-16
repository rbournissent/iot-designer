(function() {
  'use strict';

  angular
    .module('iotDesigner', []);
})();

(function() {
  'use strict';

  angular
    .module('iotDesigner')
    .controller('DashboardController', DashboardController)
    .directive('showFocus', showFocus);

  function DashboardController($scope, $http) {
    var vm = this;
    vm.title = 'DashboardController';

    function activate() {
      localStorage.removeItem('selected-project');

      try {
        $scope.user = JSON.parse(localStorage.getItem('user'));
      } catch (e) {
        $scope.user = null;
      }

      try {
        $scope.projects = JSON.parse(localStorage.getItem('projects'));
      } catch (e) {
        $scope.projects = null;
      }

      if (!$scope.projects || !$scope.projects.length) {
        $http.get('data/projects.json')
          .success(function(data) {
            $scope.projects = data;
            saveProjectsToLS($scope.projects);
          });
      }

      if (!$scope.user) {
        window.location.href = 'login.html';
      }
    }

    activate();

    $scope.removeProject = function(index) {
      $scope.projects.splice(index, 1);
      saveProjectsToLS($scope.projects);
    }

    $scope.logout = function() {
      localStorage.removeItem('user');
      window.location.href = "login.html";
    }

    $scope.addProject = function() {
      $scope.projects.push({
        editionMode: true,
        flows: []
      });
    }

    $scope.saveProject = function(project) {
      project.editionMode = false;
      project.id = $scope.projects.filter(function(p) {
        return p.id;
      }).length + 1;

      saveProjectsToLS($scope.projects);
    }

    $scope.selectProject = function(project) {
      localStorage.setItem('selected-project', JSON.stringify(project));
      window.location.href = "node-red.html";
    }

    function saveProjectsToLS(projects) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }

  }

  function showFocus($timeout) {
    return function(scope, element, attrs) {
      scope.$watch(attrs.showFocus,
        function(newValue) {
          $timeout(function() {
            newValue && element.focus();
          });
        }, true);
    }
  }
})();
