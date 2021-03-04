const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcryptjs");

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
        allowNull: false,
        unique: true
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
      password: {
        type: DataTypes.STRING,
      }
    },{
      sequelize,
      timestamps: false,
      scopes: {
        withoutPassword: {
          attributes: {
            exclude: ['password']
          }
        }
      },
      hooks: {
        beforeCreate: async function(user) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = await bcrypt.hashSync(user.password, salt);
        }
      }
    });
  }
}

User.prototype.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = User;