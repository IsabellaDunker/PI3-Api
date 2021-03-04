require('dotenv').config({path: __dirname + '/../../.env'});
var jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

function verifyJWT(req, res, next){
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;