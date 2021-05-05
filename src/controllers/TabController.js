const Tab = require('../models/Tab');

class TabController {
  static async store(req, res) {
    const { body } = req;

    try {
      const tab = await Tab.create(body);

      return res.status(201).json(tab);
    } catch (error) {
      if (error) {
        return res.status(400).json({ error: 'Try again.' });
      }
    }
  }

  static async index(req, res) {
    const tabs = await Tab.findAll({
      include: [
        {
          association: 'user',
        },
        {
          association: 'orders',
          attributes: { exclude: ['tab_id'] },
          include: {
            association: 'products',
            through: { attributes: ['price', 'units', 'note'] },
            attributes: { exclude: ['environment_id'] },
            include: {
              association: 'environment',
            },
          },
        },
      ],
      attributes: { exclude: ['user_id'] },
    });

    return res.status(200).json(tabs);
  }

  static async show(req, res) {
    const { id } = req.params;

    const tab = await Tab.findByPk(id, {
      include: [
        {
          association: 'user',
        },
        {
          association: 'orders',
          attributes: { exclude: ['tab_id'] },
          include: {
            association: 'products',
            through: { attributes: ['price', 'units', 'note'] },
            attributes: { exclude: ['environment_id'] },
            include: {
              association: 'environment',
            },
          },
        },
      ],
      attributes: { exclude: ['user_id'] },
    });

    if (tab == null) {
      return res.status(400).json({ error: 'Tab not found.' });
    }

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

    const tab = await Tab.findByPk(id);

    if (tab == null) {
      return res.status(400).json({ error: 'Tab not found.' });
    }

    return res.status(200).json({ message: 'Updated successfully!', tab });
  }

  static async delete(req, res) {
    const { id } = req.params;

    const tab = await Tab.findByPk(id);

    if (tab == null) {
      return res.status(400).json({ error: 'Tab not found.' });
    }

    await Tab.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: 'Deleted successfully!' });
  }
}

module.exports = TabController;
