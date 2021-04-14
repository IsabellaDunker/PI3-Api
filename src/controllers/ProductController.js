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

    static async canSell(id, units){
        const product = await Product.findOne({ where: {
            id: id
        } });

        const canSell = product.is_available && ((product.has_stock && product.number >= units) || (!product.has_stock));

        return canSell;
    }

    static async sell(id, units){
        const product = await Product.findByPk(id);
        console.log(product);
        const _canSell = await this.canSell(id, units);

        if(_canSell){
            await Product.update({ number: product.number - units }, {
                where: {
                    id: id
                }
            });
            return { didSell: true, price: product.price * units }
        } else {
            return { didSell: false }
        }
    }
}

module.exports = ProductController;