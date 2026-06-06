import mongoose from 'mongoose';

const quotationSchema = new mongoose.Schema({
  rfq:    { type: mongoose.Schema.Types.ObjectId, ref: 'RFQ', required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  items:  [{ name: String, quantity: Number, unitPrice: Number, total: Number }],
  totalAmount:  Number,
  deliveryDays: Number,
  notes:        String,
  status: { type: String, enum: ['submitted','accepted','rejected'], default: 'submitted' },
}, { timestamps: true });

export default mongoose.model('Quotation', quotationSchema);