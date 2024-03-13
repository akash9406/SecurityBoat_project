const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserRouter = require("./routes/User");
const connect = require("./data/database");

connect();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/user/", UserRouter.router);
app.listen(process.env.PORT, () => {
  console.log("server is connected");
});
