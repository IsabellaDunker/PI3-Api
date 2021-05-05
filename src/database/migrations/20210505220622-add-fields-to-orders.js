'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('orders', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false
    });
    await queryInterface.addColumn('orders', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('orders', 'created_at');
    await queryInterface.removeColumn('orders', 'updated_at');
  }
};
