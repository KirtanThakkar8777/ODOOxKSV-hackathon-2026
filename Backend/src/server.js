import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";

import authRoutes       from '../routers/auth.routes.js';
import vendorRoutes     from '../routers/vendor.routes.js';
import rfqRoutes        from '../routers/rfq.routes.js';
import quotationRoutes  from '../routers/quotation.routes.js';
import orderRoutes      from '../routers/order.routes.js';
import invoiceRoutes    from '../routers/invoice.routes.js';
import activityLogRoutes from '../routers/activityLog.routes.js';
import reportRoutes     from '../routers/report.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.json({ message: 'VendorBridge API is running', status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth',authRoutes);
app.use('/api/vendors',vendorRoutes);
app.use('/api/rfqs',rfqRoutes);
app.use('/api/quotations',quotationRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/invoices',invoiceRoutes);
app.use('/api/activity-logs',activityLogRoutes);
app.use('/api/reports',reportRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
  });
});



app.listen(PORT, () => {
  console.log("Server Running on Port: " + PORT);
  connectDB();
});
