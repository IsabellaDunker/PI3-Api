const { Model, DataTypes } = require('sequelize');
const Product = require('./Product');

class Environment extends Model {
    static init(sequelize) {
      super.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
          }
         }, {
            sequelize,
            timestamps: false,
        })
    }
    static associate(models) {
      this.hasMany(models.Product, { foreignKey: 'environment_id', as: 'products' });
  }
}

module.exports = Environment;