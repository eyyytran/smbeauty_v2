import { Router } from 'express'
import * as bcrypt from 'bcrypt'
import User from '../models/user'

interface IUser {
    _id: string
    displayName: string
    email: string
    password: string
    admin: boolean
}

const usersRouter = Router()

usersRouter.post('/create', async (req, res) => {
    const { displayName, email, password, admin } = req.body

    if (!displayName || !email || !password) return res.sendStatus(400)

    const isExisting = User.exists({ email }, (err, doc) => {
        if (err) {
            res.sendStatus(500)
        } else {
            return true
        }
        return false
    })

    if (isExisting) return res.status(400).json({ error: 'This account already exists' })

    try {
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            displayName,
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
    query.findOne(async (error, user: IUser) => {
        if (error) return res.status(400).send(error)
        if (user) {
            const isValidated = await bcrypt.compare(password, user.password)
            if (!isValidated) return res.sendStatus(400)
            const { _id, email, displayName } = user
            res.status(200).json({ _id, email, displayName })
        }
    })
})

usersRouter.post('/update', async (req, res) => {
    const { password, email, newPassword, newEmail, newDisplayName } = req.body
    const query = User.where({ email })
    query.findOne()
})

export default usersRouter
