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

  function ProjectDetailsController($scope, $http) {
    var vm = this;
    vm.title = 'ProjectDetailsController';

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

    $scope.logout = function() {
      localStorage.removeItem('user');
      window.location.href = "login.html";
    }

  }
})();
