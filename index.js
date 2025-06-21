require("./utils/db");
const express = require("express");
const cors = require("cors");
const port = 2334;

const app = express();
app.use(
  cors({
    origin: "https://soun-ecommerce.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: false,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my ecommerce app");
});

app.use("/api/product", require("./Router/productRoute"));
app.use("/api", require("./Router/userRouter"));

app.listen(port, () => {
  console.log(`app is listening to ${port}`);
});

module.exports = app;
