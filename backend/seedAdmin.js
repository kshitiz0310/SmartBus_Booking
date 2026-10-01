import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import User from "./Models/User.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas...");

    const adminEmail = "admin@busbooking.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log(`Admin user '${adminEmail}' already exists. Ensured role is 'admin'.`);
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "System Admin",
        email: adminEmail,
        password: hashedPassword,
        phone: "9999999999",
        age: 30,
        role: "admin",
      });
      console.log(" Admin account created successfully!");
      console.log(` Email: ${adminEmail}`);
      console.log(` Password: admin123`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

seedAdmin();
