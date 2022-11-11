import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    email: String,
    admin: Boolean,
})

const User = mongoose.model('Users', userSchema)

export default User
