import express, { Express } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config();
const app: Express = express()
const port = process.env.PORT || 5000

app.use(express.urlencoded())
app.use(express.json())
app.use(routes)

app.listen(port, () => { 
  console.log(`Server listening on port : ${port}!!`)
  // database
  mongoose
    .connect(`mongodb+srv://${process.env.DB_USER_ID}:${process.env.DB_USER_PASSWORD}@boilerplate.zkvdpzk.mongodb.net/${process.env.DB_NAME}`)
    .then(() => {
      console.log('[mongoose] Success Connecting MongoDB...')
    })
    .catch((err) => {
      console.log(`${err}`)
    })
})

