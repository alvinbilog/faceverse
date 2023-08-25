// getting-started.js
import mongoose from 'mongoose';

async function connectDb() {
  try {
    const connection = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`MongoDb connected ${connection.connection.host}`);
  } catch (e: any) {
    console.log(e);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
export default connectDb;
