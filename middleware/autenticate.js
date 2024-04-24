import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'
const secret_key = process.env.SECRET_KEY || 'Some_KEY_WHICH_IS_HARD_TO_GUESS'

const autenticate = async (req, res, next) => {
  try {
    
    const token = req.cookies.LetsConnectweb;
    //console.log(token);
    const verifyToken = jwt.verify(token , secret_key);
    //console.log(verifyToken);
    const currentUser = await User.findOne({_id:verifyToken._id , "tokens.token" :token});
    console.log(currentUser);
    if(!currentUser){
        throw new Error("User Not Found");
    }
    req.token = token ;
    req.user = currentUser ;
    req.id = currentUser._id;
    next();

  } catch (err) {
    console.log('Autentication failed: ' + err);
    res.status(401).json({msg:"Autentication failed"+err})  
  }
}

export {autenticate} ;