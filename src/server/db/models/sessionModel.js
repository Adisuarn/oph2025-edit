import mongoose from 'mongoose'
import { type } from 'os'
const { Schema } = mongoose

const sessionSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    expires_at: {
        type: Date,
        required: true
    }
})

export default sessionSchema
