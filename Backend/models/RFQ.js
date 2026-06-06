import mongoose from 'mongoose';

const rfqSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: String,
  items: [{ name: String, quantity: Number, unit: String }],
  deadline:    Date,
  status:      { type: String, enum: ['open','closed','awarded'], default: 'open' },
  assignedVendors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }],
  createdBy:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachment:  String,
}, { timestamps: true });

export default mongoose.model('RFQ', rfqSchema);