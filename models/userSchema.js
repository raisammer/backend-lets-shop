import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const secret_key = process.env.SECRET_KEY||'Some_KEY_WHICH_IS_HARD_TO_GUESS'

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('not valid email address')
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  carts: Array,
})

userSchema.pre('save', async function (next) {
  // Only hash passwords if they are modified
  if (this.isModified('password')) {
    try {
      // Hash the password and cpassword fields with bcrypt
      this.password = await bcrypt.hash(this.password, 12)
      this.cpassword = await bcrypt.hash(this.cpassword, 12)
    } catch (error) {
      return next(error)
    }
  }
  next()
})

userSchema.methods.generateAuthToken = async function () {
  try {
    console.log(secret_key)
    let token = jwt.sign({ _id: this._id }, secret_key, { expiresIn: '1h' })
    console.log(token)
    this.tokens = this.tokens.concat({token:token}) ;
    await this.save()
    return token
  } catch (error) {
    console.log('Error in genertating the token ' + error)
  }
}

// add to cart of the user ;
userSchema.methods.addCart = async function(product){
  try{
    this.carts.push(product);
    await this.save() ;
    return this.carts ;
  }
  catch(err){
    throw new Error("Error in adding " , err);
  }
}
const User = new mongoose.model('User', userSchema)

export default User
