'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products',{
      id:{
        type: Sequelize.INTEGER,
         primaryKey: true,
         autoIncrement: true,
         allowNull: false
      },
      environment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'environments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      is_available:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }, 
      has_stock:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }, 
      number:{
        type: Sequelize.BIGINT,
        allowNull: true,
      }, 
      unit_type: {
        type: Sequelize.ENUM('kg', 'g', 'litros', 'ml'),
        allowNull: false,
        defaultValue: 'kg'
      },
      price:{
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};
