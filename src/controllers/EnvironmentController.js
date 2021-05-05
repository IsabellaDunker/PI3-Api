const Environment = require('../models/Environment');

class EnvironmentController {
  static async store(req, res) {
    const { name, is_active } = req.body;

    try {
      const environment = await Environment.create({ name, is_active });

      return res.status(201).json(environment);
    } catch (error) {
      if (error) {
        return res.status(400).json({ error: 'Try again.' });
      }
    }
  }

  static async index(req, res) {
    const environments = await Environment.findAll({
      include: { association: 'products' },
    });

    return res.status(201).json(environments);
  }

  static async show(req, res) {
    const { id } = req.params;

    const environment = await Environment.findByPk(id, {
      include: { association: 'products' },
    });

    if (environment == null) {
      return res.status(400).json({ error: 'Environment not found.' });
    }

    return res.json(environment);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    await Environment.update(body, {
      where: {
        id: id,
      },
    });

    const environment = await Environment.findByPk(id);

    if (environment == null) {
      return res.status(400).json({ error: 'Environment not found.' });
    }

    return res.status(200).json({ message: 'Updated successfully!' });
  }

  static async delete(req, res) {
    const { id } = req.params;

    const environment = await Environment.findByPk(id);

    if (environment == null) {
      return res.status(400).json({ error: 'Environment not found.' });
    }

    await Environment.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: 'Deleted sucessfully!' });
  }
}

module.exports = EnvironmentController;