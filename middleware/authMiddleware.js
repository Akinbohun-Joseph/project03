const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../jwtToken/jwt');
const userModel = require('../models/userModel');



const authMiddleware = async (req, res, next) => {

  const token = req.cookies.token;
  const secret = process.env.JWT_SECRET
  if (!token) {

    return res.status(401).json({ message: 'Unauthorized, Please login to continue' }).status(404)
  }

  try {
    const verifyToken = jwt.verify(token, secret);
    const user = await userModel.findById(verifyToken.id).select('-password ')

    if(!user ||!verifyToken){
      return res.json({message: 'Token Invalid'}).status(404)
    }
    req.user = user
    next();
  } catch (error) {console.log(error)
  }
  return res.status(401).json({ message: 'Unauthorized' });
  
}
 
module.exports = authMiddleware
