import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from './models/user'

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

app.get('/', cors(), async (req, res) => {
    res.send('Hello World')
})

app.get('/home', async (req, res) => {
    res.send({ message: 'This is the data for the home page' })
})

app.post('/api/shopping-lists', async (req, res) => {
    const { username, email, admin } = req.body
    let user = new User({
        username,
        email,
        admin,
    })

    let savedUser = await user.save()

    if (savedUser) {
        res.json(savedUser)
    } else {
        res.status(500).json({ message: 'Unable to save the new user' })
    }
})

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))
