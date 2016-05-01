(function () {
  'use strict';

  angular
    .module('products')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Create Products',
      state: 'products.create',
      icon: 'fa-plus-square-o',
      roles: ['admin']
    });
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Products',
      state: 'products.manage',
      icon: 'fa-plus-square-o',
      roles: ['admin']
    });
  }
})();
