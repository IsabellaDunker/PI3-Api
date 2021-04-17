const Tab = require('../models/Tab');
const Order = require('../models/Order');
const Product = require('../models/Product');
const ProductsOrdered = require('../models/ProductsOrdered');
const User = require('../models/User');

class TabController {
  static async store(req, res) {
    const { body } = req;
    const tab = await Tab.create(body);

    return res.status(200).json(tab);
  }

  static async index(req, res) {
    const tabs = await Tab.findAll({
      include: [ 'user', 'orders' ]
    });

    return res.status(201).json(tabs);
  }

  static async show(req, res) {
    const { id } = req.params;

    const tab = await Tab.findByPk(id);
    const { user_id, is_open } = tab;

    const orders = await Order.findAll({
      where: {
        tab_id: tab.id,
      },
    });

    const _orders = await Promise.all(
      orders.map(async (orders) => {
        const productsOrder = await ProductsOrdered.findAll({
          where: {
            order_id: orders.id,
          },
        });

        const order_products = await Promise.all(
          productsOrder.map(async (productsOrder) => {
            const product = await Product.findAll({
              where: {
                id: productsOrder.product_id,
              },
              include: { association: 'environment' },
              attributes: { exclude: ['environment_id'] },
            });

            const getProductsOrder = {
              id: productsOrder.id,
              units: productsOrder.units,
              price: productsOrder.price,
              product,
            };
            return getProductsOrder;
          })
        );

        const ordersCopy = {
          id: orders.id,
          waiter_id: orders.waiter_id,
          order_products,
        };

        return ordersCopy;
      })
    );

    const tabCopy = {
      id: tab.id,
      user_id,
      is_open,
      orders: _orders,
    };

    res.status(201).json(tabCopy);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    await Tab.update(body, {
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: 'Updated successfully!' });
  }

  static async delete(req, res) {
    const { id } = req.params;

    await Tab.destroy({
        where:{
            id: id
        }
    })

    return res.status(200).json({ message: 'Deleted successfully!' });;
  }
}

module.exports = TabController;