const { Model, DataTypes } = require('sequelize');

class Token extends Model {
  static init(sequelize) {
    super.init({
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      }
    },{
      sequelize,
      timestamps: false
    });
  }
}


module.exports = Token;