import express from 'express'
import { autenticate } from '../middleware/autenticate.js'

import {getproducts} from "../controllers/getproducts.js"
import { getindividualData } from '../controllers/getindividualData.js'
import { register  } from "../controllers/register.js"
import {logIn} from "../controllers/login.js"
import {cartStore} from "../controllers/cart.js"
import {CartItems} from '../controllers/CartItems.js'
import DeleteCart from '../controllers/DeleteCart.js'
import LogOut from '../controllers/LogOut.js'

const router = express.Router()


router.get('/getproducts' ,getproducts) ;
router.get('/getproductsone/:id',getindividualData );


router.post('/register',register);
router.post('/login', logIn)
router.post('/addcart/:id',  autenticate ,cartStore)
router.get('/cartitems' , autenticate , CartItems );
router.delete('/delete/:id' ,autenticate , DeleteCart)
router.post('/logout' ,autenticate, LogOut)

export default router ;