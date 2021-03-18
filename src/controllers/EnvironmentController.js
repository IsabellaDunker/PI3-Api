const Environment = require('../models/Environment');

class EnvironmentController {
  static async store(req, res) {
    const { name, is_active } = req.body
    const environment = await Environment.create({ name, is_active});

    return res.status(201).json(environment);
  }
  
  static async index(req, res){

    const environments = await Environment.findAll({include: { association: 'products' }})

    return res.status(201).json(environments);
  }

  static async show(req, res){
    const { id } = req.params;

    const environment = await Environment.findByPk(id, {
      include: { association: 'products' }
    });

    return res.json(environment);
  }

  static async update(req, res){
    const { id } = req.params;
    const { body } = req;

    await Environment.update(body, {
      where: {
        id: id
      }
    });

    return res.status(200).json({ message: 'Updated successfully!' });;
  }

  static async delete(req, res){
    const { id } = req.params;

    await Environment.destroy({
      where: {
        id: id
      }
    });

    return res.status(200).json({ message: 'Deleted sucessfully!'});
  }
}


module.exports = EnvironmentController;