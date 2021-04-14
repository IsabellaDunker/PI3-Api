const { Model, DataTypes} = require('sequelize');

class Order extends Model {
    static init(sequelize) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                 primaryKey: true,
                 autoIncrement: true,
                 allowNull: false
              },
            waiter_id:{
                type: DataTypes.INTEGER,
                allowNull: false
            },
            }, {
                sequelize,
                timestamps: false,
        })
    }

    static associate(models) {
        this.belongsToMany(models.Product, { foreignKey: 'order_id', through:'products_ordereds' , as: 'products' });
    }
}

module.exports = Order;