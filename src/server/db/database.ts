import { Lucia } from "lucia";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import mongoose from "mongoose";
import userSchema from "./models/userModel";
import sessionSchema from "./models/sessionModel";

await mongoose.connect(process.env.MONGODB_URI!)

const User = mongoose.model('User', userSchema)
const Session = mongoose.model('Session', sessionSchema)

const adapter = new MongodbAdapter(
    mongoose.connection.collection("sessions"),
    mongoose.connection.collection("users")
)
