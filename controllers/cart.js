
import Products from '../models/productsSchema.js'
import User from '../models/userSchema.js'

const cartStore = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Products.findOne({ id: id })
    if(!product){
        return res.status(404).json({msg : `Product with given ${id} Not fouund`})
    }
    console.log('Here the Product ', product, ' : ) : ) ')
    const user = req.user ;
    const _id = user._id ;
   // console.log(user , _id);
    if(user){
        const result = await user.addCart(product);
    }else{
        res.status(401).json({msg : " User Not Valid"});
    }    
    res.status(201).json(user);

  } catch (err) {
    console.log('Error in storing to cart', err)
    res.status(401).json({ message: err.message })
  }
}

export {cartStore} ; 