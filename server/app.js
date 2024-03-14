const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const UserRouter = require("./routes/User");
const connect = require("./data/database");
const productsRouter = require("./routes/Product");
const cartRouter = require("./routes/Cart");
const isAuthenticated = require("./middleware/auth");
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
app.use("/products", productsRouter.router);
app.use("/user/", UserRouter.router);
app.use("/cart", isAuthenticated, cartRouter.router);
app.listen(process.env.PORT, () => {
  console.log("server is connected");
});
