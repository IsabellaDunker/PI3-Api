const User = require('../models/User');

class UserController {
  static async store(req, res) {
    const { body } = req;

    try {
      const user = await User.create(body);

      return res.status(201).json(user);
    } catch (error) {
      if (error) {
        return res.status(400).json({ error: 'Try again.' });
      }
    }
  }

  static async show(req, res) {
    const { id } = req.params;

    const user = await User.scope('withoutPassword').findByPk(id);

    if (user == null) {
      return res.status(400).json({ error: 'User not found.' });
    }

    return res.json(user);
  }

  static async index(req, res) {
    const users = await User.scope('withoutPassword').findAll();
    return res.json(users);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { body } = req;

    await User.update(body, {
      where: {
        id: id,
      },
    });

    const user = await User.scope('withoutPassword').findByPk(id);

    if (user == null) {
      return res.status(400).json({ error: 'User not found.' });
    }

    return res.status(200).json({ error: 'Updated succesfully! ', user });
  }

  static async delete(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (user == null) {
      return res.status(400).json({ error: 'User not found.' });
    }

    await User.destroy({
      where: {
        id: id,
      },
    });

    return res.status(200).json({ message: 'Deleted succesfully! ' });
  }
}

module.exports = UserController;
