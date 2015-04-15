(function() {
  'use strict';

  angular
    .module('login', []);
})();

(function() {
  'use strict';

  angular
    .module('login')
    .controller('LoginController', LoginController);

  function LoginController() {
    var vm = this;
    vm.title = 'LoginController';
    vm.user = {};

    vm.saveUser = saveUser;

    function saveUser (user) {
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = 'index.html';
    }
}
})();