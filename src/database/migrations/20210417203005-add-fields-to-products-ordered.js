'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products_ordereds', 'note', {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products_ordereds', 'note');
  }
};
