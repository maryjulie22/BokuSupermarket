const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./Config/databaseConfig');
const userRoute= require('./Route/UsersRoute');

const app = express();
const productRoute = require('./Route/ProductRoute');

dotenv.config(); // Load environment variables from .env file
connectDB(); // Connect to the database

// Middleware
app.use(express.json());

app.use('/products', productRoute); // Use the product route for product-related endpoints
app.use('/users',userRoute); //use the user user route for user-related endpoints

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});