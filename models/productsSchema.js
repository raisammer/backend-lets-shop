import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    id: String,
    url: String,
    detailUrl: String,
    title: {
      shortTitle: String,
      longTitle: String
    },
    price: {
      mrp: Number,
      cost: Number,
      discount: String,
    },
    description: String,
    discount: String,
    tagline: String,
  },
  {
    timestamps: true,
  }
)

const Products = new mongoose.model('products', productSchema)

export default Products;
