const { Model, DataTypes } = require('sequelize');

class User extends Model {
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
      cpf: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cellphone: {
        type: DataTypes.STRING,
      },
      birth_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      type: {
        type: DataTypes.ENUM('Admin', 'Waiter', 'Customer'),
        allowNull: false,
        defaultValue: 'Customer'
      },
    },{
      sequelize,
      timestamps: false,
    });
  }
}


module.exports = User;