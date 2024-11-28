import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js'; // Import users data
import products from './data/products.js'; // Import products data
import User from './models/userModel.js'; // User model
import Product from './models/productModel.js'; // Product model
import Order from './models/orderModel.js'; // Order model
import connectDB from './config/db.js'; // Database connection

dotenv.config(); // Load environment variables

connectDB(); // Connect to the database

const importData = async () => {
  try {
    console.log('Deleting existing data...'); // Log before deletion
    await Order.deleteMany(); // Delete existing orders
    await Product.deleteMany(); // Delete existing products
    await User.deleteMany(); // Delete existing users
    console.log('Existing data deleted.');

    console.log('Importing users...'); // Log before importing users
    const createdUsers = await User.insertMany(users); // Import users
    console.log('Users imported:', createdUsers); // Log created users

    const adminUser = createdUsers[0]._id; // Get admin user ID

    console.log('Importing products...'); // Log before importing products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }; // Associate products with admin user
    });

    await Product.insertMany(sampleProducts); // Import products
    console.log('Products imported!');

    console.log('Data Imported!'.green.inverse); // Log completion
    process.exit(); // Exit the process
  } catch (error) {
    console.error(`${error}`.red.inverse); // Log error
    process.exit(1); // Exit with error code
  }
};

const destroyData = async () => {
  try {
    console.log('Deleting existing data...'); // Log before deletion
    await Order.deleteMany(); // Delete existing orders
    await Product.deleteMany(); // Delete existing products
    await User.deleteMany(); // Delete existing users

    console.log('Data Destroyed!'.red.inverse); // Log completion
    process.exit(); // Exit the process
  } catch (error) {
    console.error(`${error}`.red.inverse); // Log error
    process.exit(1); // Exit with error code
  }
};

// Check if the script is called with -d flag to destroy data
if (process.argv[2] === '-d') {
  destroyData(); // Call function to destroy data
} else {
  importData(); // Call function to import data
}
