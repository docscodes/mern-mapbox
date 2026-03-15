const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const port = process.env.PORT || 8800;
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/pins", pinRoute);
app.use("/api/users", userRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("MongoDB connected");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

module.exports = app;
