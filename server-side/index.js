const express = require('express');
const app = express();
const connectDB  = require('./database').connectDB; // Import the connectDB function correctly
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productsRoutes");

connectDB(); // Call the connectDB function

app.use(express.json());
require("dotenv").config();
app.use("", authRoutes);
app.use("", productRoutes);

app.listen(process.env.Port, () => {
  console.log("listening on port 3000");
});