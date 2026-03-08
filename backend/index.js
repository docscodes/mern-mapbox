const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT || 8800;

try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
  });
} catch (error) {
  handleError(error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
