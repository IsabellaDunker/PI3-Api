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
            tab_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                  model: 'tabs',
                  key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
	},
	{
                sequelize,
                timestamps: false,
        })
    }

    static associate(models) {
        this.belongsToMany(models.Product, { foreignKey: 'order_id', through:'products_ordereds' , as: 'products' });
        this.belongsTo(models.Tab, { foreignKey: 'tab_id', as: 'orders'});
    }
}

module.exports = Order;
