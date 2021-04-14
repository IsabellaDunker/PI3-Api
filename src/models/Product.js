const { Model, DataTypes} = require('sequelize');

class Product extends Model {
    static init(sequelize) {
        super.init({
            id:{
                type: DataTypes.INTEGER,
                 primaryKey: true,
                 autoIncrement: true,
                 allowNull: false
              },
              name:{
                type: DataTypes.STRING,
                allowNull: false,
              },
              is_available:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
              }, 
              has_stock:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
              }, 
              number:{
                type: DataTypes.BIGINT,
                allowNull: true,
              }, 
              unit_type: {
                type: DataTypes.ENUM('kg', 'g', 'litros', 'ml'),
                allowNull: false,
                defaultValue: 'kg'
              },
              price:{
                type: DataTypes.FLOAT,
                allowNull: false,
              },
            }, {
                sequelize,
                timestamps: false,
        })
    }

    static associate(models) {
        this.belongsTo(models.Environment, { foreignKey: 'environment_id', as: 'environment' });
        this.belongsToMany(models.Order, { foreignKey: 'product_id', through:'products_ordereds' , as: 'orders' });
    }
}

module.exports = Product;