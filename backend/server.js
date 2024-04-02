import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import connectToMongoDB from "./db/connectToMongodb.js";
import portectRoutes from "./middleware/protectRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/message",portectRoutes, messageRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`The app is running on the port ${PORT}`);
});
