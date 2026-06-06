import PurchaseOrder from '../models/PurchaseOrder.js';
import Quotation from '../models/Quotation.js';
import ActivityLog from '../models/ActivityLog.js';

export const createOrder = async (req, res, next) => {
  try {
    const { quotationId } = req.body;
    const quote = await Quotation.findById(quotationId).populate('vendor');
    if (!quote) return res.status(404).json({ message: 'Quotation not found' });

    const poNumber = 'PO-' + Date.now();
    const order = await PurchaseOrder.create({
      poNumber,
      quotation: quote._id,
      vendor:    quote.vendor._id,
      rfq:       quote.rfq,
      items:     quote.items,
      totalAmount: quote.totalAmount,
    });
    await ActivityLog.create({ user: req.user.id, action: 'Created Purchase Order', entity: 'PurchaseOrder', entityId: order._id });
    res.status(201).json(order);
  } catch (err) { next(err); }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await PurchaseOrder.find()
      .populate('vendor', 'name')
      .populate('rfq', 'title')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) { next(err); }
};

export const approveOrder = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;  // status: 'approved' or 'rejected'
    const order = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      { status, remarks, approvedBy: req.user.id },
      { new: true }
    );
    await ActivityLog.create({ user: req.user.id, action: `${status} Purchase Order`, entity: 'PurchaseOrder', entityId: order._id });
    res.json(order);
  } catch (err) { next(err); }
};