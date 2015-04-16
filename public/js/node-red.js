(function() {
  'use strict';

  angular
    .module('iotDesigner.project-details', []);
})();

(function($) {
  'use strict';

  angular
    .module('iotDesigner.project-details')
    .run(hideNRHeader);

  function hideNRHeader() {
    $('iframe').hide();
    $('iframe').load(function() {
      $("iframe").contents().find("#header").hide();
      $("iframe").contents().find("#main-container").css("top", 0);
      $(".rotate").hide();
      $('iframe').show();
    });

  }
})($);

(function() {
  'use strict';

  angular
    .module('iotDesigner.project-details')
    .controller('ProjectDetailsController', ProjectDetailsController);

  function ProjectDetailsController($scope, $http, $timeout) {
    var vm = this;
    vm.title = 'ProjectDetailsController';

    function activate() {
      try {
        $scope.project = JSON.parse(localStorage.getItem('selected-project'));
      } catch (e) {
        $scope.project = null;
      }
      try {
        $scope.user = JSON.parse(localStorage.getItem('user'));
      } catch (e) {
        $scope.user = null;
      }

      if (!$scope.user) {
        window.location.href = 'login.html';
      }

      if (!$scope.project) {
        window.location.href = 'index.html';
      }

      // Sets the current project's flows on the node-red instance
      $http.post('red/flows', $scope.project.flows)
        .success(function(data) {
          console.log('flows set for project', $scope.project.name, $scope.project.flows);
        });
    }

    activate();

    $scope.logout = function() {
      localStorage.removeItem('user');
      window.location.href = "login.html";
    }

    $scope.deployProject = function() {
      $("iframe").contents().find('#btn-deploy')[0].click();

      // Waits until the flows are saved on the server and then tries to save
      // them on LS
      $timeout(function() {
        saveProjectToLS($scope.project);
      }, 1000);

      // If there is an error on the flow the user is asked to confirm the deployment
      $('iframe').contents().find('div.ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix > div > button').click(function () {
        saveProjectToLS($scope.project);
      })
    }

    function saveProjectToLS(project) {

      //Gets the flows we just saved on the server and then saves it on LS
      $http.get('red/flows')
        .success(function(flows) {
          project.flows = flows;

          try {
            var projects = JSON.parse(localStorage.getItem('projects')) || [];
          } catch (e) {
            var projects = [];
          }

          for (var i = 0; i < projects.length; i++) {
            if (projects[i].id === project.id) {
              projects[i].flows = project.flows;
            }
          }

          localStorage.setItem('selected-project', JSON.stringify(project));
          localStorage.setItem('projects', JSON.stringify(projects));
        });

    }

  }
})();
