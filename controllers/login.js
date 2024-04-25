import User from '../models/userSchema.js'
import bcrypt from 'bcrypt';



const logIn = async (req, res) => {
  try {
    const {email , password} = req.body ;
    if(!email || !password) {
        return res.status(422).json({msg: "Fill all the details"});
    }

    const loginUser = await User.findOne({email: email});
    if(!loginUser) {
       return res.status(404).json({msg:"User not found"});
    }

    // It returns the promise 
    const match = await bcrypt.compare(password , loginUser.password);
    console.log(match);

    // Here we will generate cookie and token and match them 
     const token = await loginUser.generateAuthToken()
     console.log(token);

    // We will generate cookie parser and match the token
    res.cookie('LetsConnectweb', token, {
      expires: new Date(Date.now() + 1000000),
      httpOnly: true,
      SameSite: 'None',
      secure: true,
    })


    if(!match){
      return res.status(422).json({msg:"Password does not match"});
    }
    return res.status(201).json(loginUser);

  } catch (err) {
    console.log('Error in sign in ', err)
    res.status(401).json({ message: ' sign In' + err.message })
  }
}

export { logIn }
