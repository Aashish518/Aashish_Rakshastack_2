// Initialize express app
const express = require("express");
const app = express();

// environment variables
require("dotenv").config()

// Connect to database
const mongodb = require("./database/db");
mongodb();

// Import user routes
const product = require("./routers/product");

// Middleware to parse JSON
const cors = require("cors");

app.use(cors({
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the router
app.use("/api", product);



// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
})