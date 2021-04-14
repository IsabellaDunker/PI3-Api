'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders',{
      id:{
        type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      waiter_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('orders');
  }
};
