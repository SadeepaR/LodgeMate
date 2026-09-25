import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

dotenv.config(); // loads the environment variables from .env file

const app = express(); // creates an instance of an express application
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors()); // enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // enable JSON body parsing
app.use(express.urlencoded({ extended: true })); // enable URL-encoded body parsing


app.use("/api/auth", authRoutes); // login or logout will be handled by auth routes
app.use("/api/users", userRoutes); // register will be handled by users router

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
