const Order = require('../models/Order');
const ProductController = require('./ProductController');
const Product = require('../models/Product');
const ProductsOrdered = require('../models/ProductsOrdered');

class OrderController {
  static async store(req, res) {
    const { waiter_id, products, tab_id } = req.body;

    const _canSell = await Promise.all(
      products.map(async (product) => {
        const { id, units } = product;
        const condition = await ProductController.canSell(id, units);

        return condition;
      })
    );

    if (_canSell) {
      const order = await Order.create({ waiter_id, tab_id });

      await Promise.all(
        products.map(async (product) => {
          const { id, units } = product;
          const { price } = await ProductController.sell(id, units);
          await ProductsOrdered.create({
            order_id: order.id,
            product_id: id,
            units,
            price,
          });
          return 0;
        })
      );
      return res.status(201).json({ didSell: true });
    } else {
      return res.status(400).json({ didSell: false });
    }
  }

  static async index(req, res) {
    const orders = await Order.findAll({
      include: [
        {
          association: 'products',
          through: { attributes: ['price', 'units', 'note'] },
        },
      ],
    });

    return res.status(201).json(orders);
  }

  static async show(req, res) {
    const { id } = req.params;

    const orders = await Order.findByPk(id, {
      include: [
        {
          association: 'products',
          through: { attributes: ['price', 'units', 'note'] },
        },
        {
          association: 'tab',
          attributes: { exclude: ['user_id'] },
          include:{
            association: 'user'
          }
        }
      ],
    });

    return res.status(201).json(orders);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { units, waiter_id } = req.body;

    await Order.update(
      { waiter_id },
      {
        where: {
          id: id,
        },
      }
    );

    const productsOrder = await ProductsOrdered.findAll({
      where: {
        order_id: id,
      },
    });

    await Promise.all(
      productsOrder.map(async (productsOrder) => {
        const products = await Product.findOne({
          where: {
            id: productsOrder.product_id,
          },
        });
        if (units) {
          await ProductsOrdered.update(
            { units, price: Number(units) * Number(products.price) },
            {
              where: {
                order_id: id,
                product_id: products.id,
              },
            }
          );
        }

        return 0;
      })
    );

    return res.status(200).json({ message: 'Updated successfully!' });
  }

  static async delete(req, res) {
    const { id } = req.params;

    await Order.destroy({
      where: {
        id: id,
      },
    });
    await ProductsOrdered.destroy({
      where: {
        order_id: id,
      },
    });

    return res.status(200).json({ message: 'Deleted successfully!' });
  }
}

module.exports = OrderController;
