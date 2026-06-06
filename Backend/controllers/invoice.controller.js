import Invoice from '../models/Invoice.js';
import PurchaseOrder from '../models/PurchaseOrder.js';
import ActivityLog from '../models/ActivityLog.js';
import { sendInvoiceMail } from '../utils/sendMail.js';

export const generateInvoice = async (req, res, next) => {
  try {
    const { purchaseOrderId } = req.body;
    const po = await PurchaseOrder.findById(purchaseOrderId).populate('vendor');
    if (!po) return res.status(404).json({ message: 'PO not found' });

    const subtotal   = po.totalAmount;
    const taxAmount  = +(subtotal * 0.18).toFixed(2);
    const totalAmount = +(subtotal + taxAmount).toFixed(2);

    const invoice = await Invoice.create({
      invoiceNumber: 'INV-' + Date.now(),
      purchaseOrder: po._id,
      vendor:        po.vendor._id,
      items:         po.items,
      subtotal,
      taxAmount,
      totalAmount,
    });
    await ActivityLog.create({ user: req.user.id, action: 'Generated Invoice', entity: 'Invoice', entityId: invoice._id });
    res.status(201).json(invoice);
  } catch (err) { next(err); }
};

export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find()
      .populate('vendor', 'name email')
      .populate('purchaseOrder', 'poNumber')
      .sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) { next(err); }
};

export const sendInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('vendor');
    if (!invoice) return res.status(404).json({ message: 'Invoice not found' });

    await sendInvoiceMail(invoice.vendor.email, invoice);
    invoice.status = 'sent';
    invoice.sentTo = invoice.vendor.email;
    await invoice.save();
    res.json({ message: 'Invoice sent', invoice });
  } catch (err) { next(err); }
};