import mongoose from 'mongoose';

const poSchema = new mongoose.Schema({
  poNumber:    { type: String, unique: true },
  quotation:   { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' },
  vendor:      { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  rfq:         { type: mongoose.Schema.Types.ObjectId, ref: 'RFQ' },
  items:       [{ name: String, quantity: Number, unitPrice: Number, total: Number }],
  totalAmount: Number,
  status:      { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  approvedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  remarks:     String,
}, { timestamps: true });

export default mongoose.model('PurchaseOrder', poSchema);