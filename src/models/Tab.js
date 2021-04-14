const { Model, DataTypes } = require('sequelize');

class Tab extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        is_open: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      }, {
        sequelize,
        timestamps: false,
      });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'tabs' });
    this.hasMany(models.Order, { foreignKey: 'tab_id', as: 'orders' });
  }
}

module.exports = Tab;