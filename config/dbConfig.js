const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const uri = process.env.MONGO_URI;
    const options = { useNewUrlParser: true };
    const conn = await mongoose.connect(uri, options);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDb };
