const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const connectDB = require("./db/connection");
const productRouter = require("./routes/productRoutes");

// CONNECT TO DATABASE
connectDB();

// MIDDLEWARE
app.use(express.json())

// ROUTES
// TEST ROUTE
// app.get("/", (req, res) => {
//     res.send("Test Route")
// })

// PRODUCT ROUTES
app.use("/api/products", productRouter);

// PORT
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});