const User = require('../models/User');

class UserController {
  static async store(req, res){
    const { body } = req
    const user = await User.create(body);

    return res.status(201).json(user);
  }

  static async show(req, res){
    const { id } = req.params;

    const user = await User.scope('withoutPassword').findByPk(id);
    return res.json(user);
  }

  static async index(req, res){
    const users = await User.scope('withoutPassword').findAll();
    return res.json(users);
  }

  static async update(req, res){
    const { id } = req.params;
    const { body } = req;

    await User.update(body, {
      where: {
        id: id
      }
    });

    return res.status(200).json();
  }

  static async delete(req, res){
    const { id } = req.params;

    await User.destroy({
      where: {
        id: id
      }
    });

    return res.status(200).json();
  }
}

module.exports = UserController;