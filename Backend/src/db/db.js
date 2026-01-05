const mongoose = require("mongoose");

function ConnectDB() {
  mongoose.connect(process.env.MONGODB_URI)

  .then(() => {
    console.log("mongoDB Connected!!")
  })
  .catch((err) =>{
    console.log("MongoDB Connection Error: " , err );
  })
}


module.exports = ConnectDB;