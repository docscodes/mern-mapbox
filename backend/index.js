const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const pinRoute = require("./routes/pins");

const port = process.env.PORT || 8800;
dotenv.config();

const app = express();

try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("MongoDB connected");
  });
} catch (error) {
  handleError(error);
}

app.use(express.json());
app.use("/api/pins", pinRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
