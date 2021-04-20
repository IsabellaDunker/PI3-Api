'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('products', 'description', {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    });
    await queryInterface.addColumn('products', 'image_url', {
      type: Sequelize.STRING,
      defaultValue: null,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('products', 'description');
    await queryInterface.removeColumn('products', 'image_url');
  },
};
