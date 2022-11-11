import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import productsRouter from './routes/products'

dotenv.config({ path: '.env' })

mongoose.connect(process.env.MONGO_URI, null, error => {
    if (error) {
        console.log('Unable to connect to database')
    } else console.log('Connected to the database')
})

const app = express()
const PORT = 4000

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))
