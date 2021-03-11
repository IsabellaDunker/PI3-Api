const { Model, DataTypes } = require('sequelize');

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
}

module.exports = Environment;