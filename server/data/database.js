const mongoose = require("mongoose");
const connect = () => {
  mongoose
    .connect(process.env.MONGO_CONNECT)
    .then((c) => console.log("databasse is connected"))
    .catch((e) => console.log(e));
};

module.exports = connect;
