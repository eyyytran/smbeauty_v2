import * as express from 'express'
import * as bcrypt from 'bcrypt'
import User from '../models/user'

const usersRouter = express.Router()

usersRouter.post('/create_user', async (req, res) => {
    const { username, email, password, admin } = req.body

    if (!username || !email || !password) return res.sendStatus(400)

    try {
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            username,
            email,
            password: hashedPassword,
            admin,
        })
        const savedUser = await user.save()
        if (savedUser) {
            res.status(201).json(savedUser)
        } else {
            res.status(500).json({ error: 'Unable to create new user' })
        }
    } catch (error) {
        res.status(500).send(error)
    }
})

export default usersRouter
