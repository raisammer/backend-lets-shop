import  Products  from '../models/productsSchema.js'

const getproducts = async (req , res) => {
  try {
    console.log(req);
    const product =  await Products.find() ;
    res.status(201).json(product);
    console.log(" Products mil gye " + product ) ;
  } catch {
    console.log("error in getting the products ");
    res.status(404).json({"msg" :"error"})
  }
}

export { getproducts};
