import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

import authRoutes from '../routers/auth.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/auth',authRoutes);



app.listen(PORT, () => {
  console.log("Server Running on Port: " + PORT);
  connectDB();
});