'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('environments', { 
       id: {
         type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
       },
       name: {
         type: Sequelize.STRING,
         allowNull: false
       },
       is_active: {
         type: Sequelize.BOOLEAN,
         allowNull: false
       }
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('environments');
  }
};
