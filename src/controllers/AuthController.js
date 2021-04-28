require('dotenv').config({path: __dirname + '/../../.env'});

var jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.SECRET;

class AuthController {
  static async login(req, res){
    const { cpf, password } = req.body;

    const user = await User.findOne({ where: { cpf: cpf } });


    if(!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    if(!(await user.validPassword(password))){
      return res.status(401).json({ message: 'Wrong credentials' })
    }

    const { id } = user;

    const token = jwt.sign({ id }, process.env.SECRET);

    res.status(200).json({ auth: true, token: token, user: {...user.dataValues, password: null}});
  }

  static logout(req, res){
    return res.status(200).json({ auth: false, token: null, user: null });
  }

  static renew(req, res){
    return res.status(200).json({auth: true});
  }
}

module.exports = AuthController;