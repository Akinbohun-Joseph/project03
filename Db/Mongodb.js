const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect()


    } catch (error) {
        console.error('MongoDB connection failed', error)

    }
}

module.exports = mongoDbConnection 