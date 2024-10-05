import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const db_url = process.env.MONGO_URI

async function connectToDatabase() {

    try {
        await mongoose.connect(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 50000,
        });
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection error:', error);
    }
  }
  
export default connectToDatabase;