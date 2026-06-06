import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => {
  console.log("Server Running on Port: " + PORT);
  connectDB();
});