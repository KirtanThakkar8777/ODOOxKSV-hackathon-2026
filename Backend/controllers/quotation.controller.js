import Quotation from '../models/Quotation.js';
import ActivityLog from '../models/ActivityLog.js';

export const submitQuotation = async (req, res, next) => {
  try {
    const quote = await Quotation.create(req.body);
    await ActivityLog.create({ user: req.user.id, action: 'Submitted Quotation', entity: 'Quotation', entityId: quote._id });
    res.status(201).json(quote);
  } catch (err) { next(err); }
};

export const getQuotationsByRFQ = async (req, res, next) => {
  try {
    const quotes = await Quotation.find({ rfq: req.params.rfqId })
      .populate('vendor', 'name email')
      .sort({ totalAmount: 1 });  // sorted lowest first for comparison
    res.json(quotes);
  } catch (err) { next(err); }
};

export const getQuotations = async (req, res, next) => {
  try {
    const quotes = await Quotation.find()
      .populate('vendor', 'name email')
      .populate('rfq', 'title status')
      .sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) { next(err); }
};

export const getQuotationById = async (req, res, next) => {
  try {
    const quote = await Quotation.findById(req.params.id)
      .populate('vendor', 'name email')
      .populate('rfq', 'title status items');
    if (!quote) return res.status(404).json({ message: 'Quotation not found' });
    res.json(quote);
  } catch (err) { next(err); }
};

export const updateQuotation = async (req, res, next) => {
  try {
    const quote = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quote) return res.status(404).json({ message: 'Quotation not found' });
    await ActivityLog.create({ user: req.user.id, action: 'Updated Quotation', entity: 'Quotation', entityId: quote._id });
    res.json(quote);
  } catch (err) { next(err); }
};

export const deleteQuotation = async (req, res, next) => {
  try {
    const quote = await Quotation.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quotation not found' });
    await ActivityLog.create({ user: req.user.id, action: 'Deleted Quotation', entity: 'Quotation', entityId: quote._id });
    res.json({ message: 'Quotation deleted' });
  } catch (err) { next(err); }
};

export const acceptQuotation = async (req, res, next) => {
  try {
    // reject all others for this RFQ first
    const quote = await Quotation.findById(req.params.id);
    if (!quote) return res.status(404).json({ message: 'Quotation not found' });
    await Quotation.updateMany({ rfq: quote.rfq }, { status: 'rejected' });
    quote.status = 'accepted';
    await quote.save();
    await ActivityLog.create({ user: req.user.id, action: 'Accepted Quotation', entity: 'Quotation', entityId: quote._id });
    res.json(quote);
  } catch (err) { next(err); }
};
