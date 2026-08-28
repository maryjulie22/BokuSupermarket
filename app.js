const express = require('express');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();

const connectDB = require('./Config/databaseConfig');

app.use(express.json()); // Middleware to parse JSON request bodies

const productRoute = require('./Route/ProductRoute');
const userRoute= require('./Route/UsersRoute');
connectDB(); // Connect to the database

app.use('/products', productRoute); // Use the product route for product-related endpoints
app.use('/users',userRoute); //use the user user route for user-related endpoints

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})