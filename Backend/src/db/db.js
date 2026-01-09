const mongoose = require("mongoose");

function ConnectDB() {
  mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })

  .then(() => {
    console.log("mongoDB Connected!!")
  })
  .catch((err) =>{
    console.log("MongoDB Connection Error: " , err );
    console.log("Make sure MongoDB is running and connection string is correct");
  })
}


module.exports = ConnectDB;