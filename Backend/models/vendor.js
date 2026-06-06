import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  phone:    String,
  gst:      String,
  category: String,
  status:   { type: String, enum: ['active','inactive'], default: 'active' },
  address:  String,
}, { timestamps: true });

export default mongoose.model('Vendor', vendorSchema);