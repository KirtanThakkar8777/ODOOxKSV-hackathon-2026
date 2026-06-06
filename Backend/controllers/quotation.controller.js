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

export const acceptQuotation = async (req, res, next) => {
  try {
    // reject all others for this RFQ first
    const quote = await Quotation.findById(req.params.id);
    await Quotation.updateMany({ rfq: quote.rfq }, { status: 'rejected' });
    quote.status = 'accepted';
    await quote.save();
    await ActivityLog.create({ user: req.user.id, action: 'Accepted Quotation', entity: 'Quotation', entityId: quote._id });
    res.json(quote);
  } catch (err) { next(err); }
};