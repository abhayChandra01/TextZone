const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {

  mongoose.Promise = global.Promise;
  const options ={
    useNewUrlParser: true,
    useUnifiedTopology: true,

  };
  mongoose.connect(
    process.env.MONGODB_URL,
     options
  )

  mongoose.connection

    .once("open", () => console.log("MongoDB Running"))

    .on("error", (err) => console.log(err))

}