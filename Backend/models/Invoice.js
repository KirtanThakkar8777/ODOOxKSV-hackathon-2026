import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, unique: true },
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  vendor:        { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  items:         [{ name: String, quantity: Number, unitPrice: Number, total: Number }],
  subtotal:      Number,
  tax:           { type: Number, default: 18 },
  taxAmount:     Number,
  totalAmount:   Number,
  status:        { type: String, enum: ['draft','sent','paid'], default: 'draft' },
  sentTo:        String,
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);