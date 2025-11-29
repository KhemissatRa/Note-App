const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// DB
const connectDB = require('./db/db');
connectDB();

// Routes
const ProductRoutes = require('./route/product');
app.use('/api', ProductRoutes); // Prefix all product routes with /api

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
