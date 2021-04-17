const Tab = require('../models/Tab');
const Order = require('../models/Order');
const Product = require('../models/Product');
const ProductsOrdered = require('../models/ProductsOrdered');
const User = require('../models/User');

class TabController {
  static async store(req, res) {
    const { body } = req;
    const tab = await Tab.create(body);

    return res.status(201).json(tab);
  }

  static async index(req, res) {
    const tabs = await Tab.findAll({
      include: ['user', 'orders'],
    });

    return res.status(200).json(tabs);
  }

  static async show(req, res) {
    const { id } = req.params;

    const tab = await Tab.findByPk(id, {
      include: ['user', 'orders'],
    });

    return res.status(200).json(tab);
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
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: 'Deleted successfully!' });
  }
}

module.exports = TabController;
