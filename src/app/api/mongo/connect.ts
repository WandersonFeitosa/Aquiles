import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI as string;

const connectMongo = async () => {
  try {
    mongoose.connect(dbURI);
  } catch (err) {
    console.log(err);
  }
};

export default connectMongo;
