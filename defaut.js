import { productsData } from "./constant/productsdata.js"
import Products from './models/productsSchema.js'
import mongoose from 'mongoose'

const saveData = async () => {
  try {
    await Products.deleteMany({});
    const storeData = await Products.insertMany(productsData);
  
  } catch (err) {
    console.log(`Error in storing the data ${err}`);
  }
}

export {saveData} ;
