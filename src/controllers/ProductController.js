const Product = require('../models/Product');

class ProductController {
    static async store(req, res){
        const { body } = req
        const product = await Product.create(body);

        return res.status(201).json(product);
    }

    static async index(req, res){
        const products = await Product.findAll({
            include: { association:'environment'},
            attributes: {exclude: ['environment_id']}
        });
            

        res.status(201).json(products);
    }

    static async show(req, res){
        const { id } = req.params;

        const products = await Product.findByPk(id);

        const environment = await Product.findByPk(id, {
            include: { association: 'environment' , where: {
                id: products.environment_id
            }}, 
            attributes: {exclude: ['environment_id']}
        });

        res.status(201).json(environment);
    }

    static async update(req, res){
        const { id } = req.params;
        const { body } = req;

        await Product.update(body, {
        where: {
            id: id
        }
        });

        return res.status(200).json();;
    }

    static async delete(req, res){
        const { id } = req.params;

        await Product.destroy({
        where: {
            id: id
        }
        });

        return res.status(200).json();;
    }
}

module.exports = ProductController;