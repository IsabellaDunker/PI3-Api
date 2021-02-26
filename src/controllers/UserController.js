const User = require('../models/User');

class UserController {
  async store(req, res){
    const { body } = req
    const user = await User.create(body);

    return res.status(201).json(user);
  }

  async show(req, res){
    const { id } = req.params;

    const user = await User.findByPk(id);
    return res.json(user);
  }

  async index(req, res){
    const users = await User.findAll();
    return res.json(users);
  }

  async update(req, res){
    const { id } = req.params;
    const { body } = req;

    await User.update(body, {
      where: {
        id: id
      }
    });

    return res.status(200).json();
  }

  async delete(req, res){
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