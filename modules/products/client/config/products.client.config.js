(function () {
  'use strict';

  angular
    .module('products')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Create Products',
      state: 'products.create',
      icon: 'fa-plus-square-o',
      roles: ['admin']
    });
  }
})();
