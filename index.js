import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import connectDB from './db/connect.js'
import { saveData } from './defaut.js'
import cors from 'cors'
import getproductsroute from './routes/getproductsroute.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser());

connectDB()
const Port = process.env.PORT || 6009

saveData()
app.use('/', getproductsroute)

app.listen(Port, () => {
  console.log(`Server Port: ${Port}`)
})
