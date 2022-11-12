import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    displayName: String,
    email: String,
    password: String,
    admin: Boolean,
})

const User = mongoose.model('Users', userSchema)

export default User
