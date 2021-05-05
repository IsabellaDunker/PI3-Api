const Product = require('../models/Product');
const Environment = require('../models/Environment');
const Order = require('../models/Order');

class ProductController {
  static async store(req, res) {
    const { body } = req;
    try {
      const product = await Product.create(body);

      return res.status(201).json(product);
    } catch (error) {
      if (error) {
        return res.status(400).json({ error: 'Try again.' });
      }
    }
  }

  static async index(req, res) {
    const products = await Product.findAll({
      include: [
        {
          association: 'environment',
          attributes: { exclude: ['environment_id'] },
        },
        {
          association: 'orders',
          through: { attributes: ['price', 'units', 'note'] },
          attributes: { exclude: ['tab_id'] },
          include: {
            association: 'tab',
            attributes: { exclude: ['user_id'] },
            include: {
              association: 'user',
            },
          },
        },
      ],
    });

    return res.status(200).json(products);
  }

  static async show(req, res) {
    const { id } = req.params;
    
    const product = await Product.findByPk(id, {
      include: [
        {
          association: 'environment',
        },
        {
          association: 'orders',
          through: { attributes: ['price', 'units', 'note'] },
          attributes: { exclude: ['tab_id'] },
          include: {
            association: 'tab',
            attributes: { exclude: ['user_id'] },
            include: {
              association: 'user',
            },
          },
        },
      ],
      attributes: { exclude: ['environment_id'] },
    });

    if (product == null) {
      return res.status(400).json({ error: 'Product not found.' });
    }

    return res.status(200).json(product);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    await Product.update(body, {
      where: {
        id: id,
      },
    });

    const product = await Product.findByPk(id);

    if (product == null) {
      return res.status(400).json({ error: 'Product not found.' });
    }

    return res.status(200).json({ message: 'Updated successfully!', product });
  }

  static async delete(req, res) {
    const { id } = req.params;


    const product = await Product.findByPk(id);

    if (product == null) {
      return res.status(400).json({ error: 'Product not found.' });
    }
    
    await Product.destroy({
      where: {
        id: id,
      },
    });


    return res.status(200).json({ message: 'Deleted successfully!' });
  }

  static async canSell(id, units) {
    const product = await Product.findOne({
      where: {
        id: id,
      },
    });

    const canSell =
      product.is_available &&
      ((product.has_stock && product.number >= units) || !product.has_stock);

    return canSell;
  }

  static async sell(id, units) {
    const product = await Product.findByPk(id);
    console.log(product);
    const _canSell = await this.canSell(id, units);

    if (_canSell) {
      await Product.update(
        { number: product.number - units },
        {
          where: {
            id: id,
          },
        }
      );
      return { didSell: true, price: product.price * units };
    } else {
      return { didSell: false };
    }
  }
}

module.exports = ProductController;
