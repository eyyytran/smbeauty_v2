import { Router } from 'express'
import * as bcrypt from 'bcrypt'
import User from '../models/user'

type UserType = {
    _id: string
    username: string
    email: string
    password: string
    admin: boolean
}

const usersRouter = Router()

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

usersRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.sendStatus(400)

    const query = User.where({ email: email.toLowerCase() })
    query.findOne(async (error, user: UserType) => {
        if (error) return res.status(400).send(error)
        if (user) {
            const isValidated = await bcrypt.compare(password, user.password)
            if (!isValidated) return res.sendStatus(400)
            const { _id, email, username } = user
            res.status(200).json({ _id, email, username })
        }
    })
})

export default usersRouter
