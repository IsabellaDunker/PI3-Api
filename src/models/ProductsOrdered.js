const { Model, DataTypes } = require('sequelize');

class ProductsOrdered extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        order_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'orders',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        product_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        units: {
          type: DataTypes.BIGINT,
          allowNull: false,
        },
        note: {
          type: DataTypes.STRING,
          defaultValue: null,
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
      }
    );
  }
}

module.exports = ProductsOrdered;
