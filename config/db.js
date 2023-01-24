const mongoose = require("mongoose")
mongoose.set('strictQuery', true)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        })
        
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB