(function() {
  'use strict';

  angular
    .module('iotDesigner', []);
})();

(function($) {
  'use strict';

  angular
    .module('iotDesigner')
    .run(hideNRHeader);

    function hideNRHeader() {
        $('iframe').load(function() {
            $("iframe").contents().find("#header").hide();
            $("iframe").contents().find("#main-container").css("top", 0);
        });
    }
})($);

(function() {
  'use strict';

  angular
    .module('iotDesigner')
    .controller('DashboardController', DashboardController);

  function DashboardController($scope, $http) {
    var vm = this;
    vm.title = 'DashboardController';

    localStorage.removeItem('selected-project');

    try {
      $scope.user = JSON.parse(localStorage.getItem('user'));
    } catch (e) {
      $scope.user = null;
    }



    if (!$scope.user) {
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

    $scope.addProject = function() {
      $scope.projects.push({
        editionMode: true
      });
    }

    $scope.saveProject = function(project) {
      project.editionMode = false;
      project.id = $scope.projects.filter(function(p) {
        return p.id;
      }).length + 1;
    }

    $scope.selectProject = function(project) {
      localStorage.setItem('selected-project', JSON.stringify(project));
      window.location.href = "node-red.html";
    }

  }
})();
