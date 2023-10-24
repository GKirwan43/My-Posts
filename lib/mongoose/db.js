import mongoose from 'mongoose';

const connect = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return;
        }

        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB connection successful")
    } catch (error) {
        throw new Error("Error connecting to mongodb: " + error)
    }
}

export default connect;