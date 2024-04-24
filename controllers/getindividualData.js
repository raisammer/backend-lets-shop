import Products from '../models/productsSchema.js'

const getindividualData = async (req, res) => {
  console.log(req.params)
  try {
    const { id } = req.params
    const product = await Products.findOne({ id: id })
    console.log(product)
    res.status(201).json(product)
  } catch (err) {
    console.log('Single product data error 400' + err)
    res.status(400).json({ msg: err })
  }
}
export { getindividualData }
