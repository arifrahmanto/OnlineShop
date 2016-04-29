'use strict';

// Configuring the Articles module
angular.module('users.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Manage Users',
      state: 'admin.users',
      icon: 'fa-group',
      roles: ['admin']
    });
  }
]);
