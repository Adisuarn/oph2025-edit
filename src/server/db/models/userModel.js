import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

export default userSchema
