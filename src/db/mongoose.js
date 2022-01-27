const mongoose = require("mongoose");

const getConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("connection succesfull");
  } catch (err) {
    console.log("connection to db failed");
  }
};
getConnection();
