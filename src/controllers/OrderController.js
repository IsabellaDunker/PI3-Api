const Order = require('../models/Order');
const ProductController =  require('./ProductController');
const Product = require('../models/Product');
const ProductsOrdered = require('../models/ProductsOrdered');

class OrderController {
    static async store(req, res){
        const { waiter_id, products } = req.body;

        const _canSell = await Promise.all(products.map(async (product) => {
            const { id, units } = product;
            const condition = await ProductController.canSell(id, units);
            
            return condition;
        }))


        if(_canSell){
            const order = await Order.create({ waiter_id });
            await Promise.all(products.map(async (product) => {
                const { id, units } = product;
                const { price } = await ProductController.sell(id, units);
                await ProductsOrdered.create({ order_id: order.id, product_id: id, units, price });
                return 0;
            }))
            return res.status(201).json({didSell: true });
        } else {
            return res.status(400).json({ didSell: false });
        }
    }

    static async index(req, res){
        const orders = await Order.findAll();

        const _order_products = await Promise.all(orders.map(async (orders) => {

            const productsOrder = await ProductsOrdered.findAll({
                where:{
                    order_id: orders.id
                }
            });

            const order_products = await Promise.all(productsOrder.map(async (productsOrder) => {
                const product = await Product.findAll({
                    where: {
                        id: productsOrder.product_id
                    },
                    include: { association:'environment'},
                    attributes: {exclude: ['environment_id']}
                });
                
                const getProductsOrder = {
                    id: productsOrder.id,
                    units: productsOrder.units,
                    price: productsOrder.price,
                    product
                }
                return getProductsOrder;

            }));
            return order_products;
        }));

        let i = 0;
        const _ordersCopy = await Promise.all(orders.map(async (orders) => {
            const ordersCopy = {
                id: orders.id, 
                waiter_id: orders.waiter_id,
                order_products: _order_products[i]
            }
            i++;
            return ordersCopy;
        }));

        res.status(201).json(_ordersCopy);
    }

    static async show(req, res){
        const { id } = req.params;
        
        const order = await Order.findByPk(id);
        const { waiter_id } = order;

        const productsOrder = await ProductsOrdered.findAll({
            where:{
                order_id: order.id
            }
        });

        const order_products = await Promise.all(productsOrder.map(async (productsOrder) => {
            
            const product = await Product.findAll({
                where: {
                    id: productsOrder.product_id
                },
                include: { association:'environment'},
                attributes: {exclude: ['environment_id']}
            });
            
            const getProductsOrder = {
                id: productsOrder.id,
                units: productsOrder.units,
                price: productsOrder.price,
                product
            }
            return getProductsOrder;
        }));

        const orderCopy = {
            id: order.id,
            waiter_id,
            order_products,
        }

        res.status(201).json(orderCopy);
    }

    static async update(req, res){
        const { id } = req.params;
        const { units, waiter_id } = req.body;
        
        await Order.update({ waiter_id }, {
            where: {
                id: id
            }
        });

        const productsOrder = await ProductsOrdered.findAll({ 
            where:{ 
                order_id: id
            }
        });

        await Promise.all(productsOrder.map(async (productsOrder) => {
            const products = await Product.findOne({
                where:{ 
                    id: productsOrder.product_id
                }
            });
            if(units){
                await ProductsOrdered.update({units, price: Number(units) * Number(products.price)}, {
                    where: {
                        order_id: id,
                        product_id: products.id
                    }
            });
        }

            return 0;
        }));

        return res.status(200).json({ message: 'Updated successfully!' });;
    }

    static async delete(req, res){
        const { id } = req.params;

        await Order.destroy({
            where: {
                id: id
            }
        });
        await ProductsOrdered.destroy({
            where:{
                order_id: id
            }
        });

        return res.status(200).json({ message: 'Deleted successfully!' });;
    }
}

module.exports = OrderController;