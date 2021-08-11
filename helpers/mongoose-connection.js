const mongoose = require("mongoose");
console.log(process.env.MONGO_URI);

module.exports = () => {
  mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    function (err) {
      if (err) console.log(err);
    }
  );
  console.log("Mongoose connection started");
};
