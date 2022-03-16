import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

import users from "./data/users.js";
import products from "./data/products.js";

import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";

import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seed = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!");
    process.exit();
  } catch (e) {
    console.error(`${error}`.red.inverted);
    process.exit(1);
  }
};

const destroy = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroyed!");
    process.exit();
  } catch (e) {
    console.error(`${error}`.red.inverted);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroy();
} else {
  seed();
}
