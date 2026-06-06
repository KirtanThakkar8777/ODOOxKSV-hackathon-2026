import RFQ from '../models/RFQ.js';
import ActivityLog from '../models/ActivityLog.js';

export const getRFQs = async (req, res, next) => {
  try {
    const rfqs = await RFQ.find()
      .populate('assignedVendors', 'name email')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    res.json(rfqs);
  } catch (err) { next(err); }
};

export const getRFQById = async (req, res, next) => {
  try {
    const rfq = await RFQ.findById(req.params.id)
      .populate('assignedVendors')
      .populate('createdBy', 'name');
    if (!rfq) return res.status(404).json({ message: 'RFQ not found' });
    res.json(rfq);
  } catch (err) { next(err); }
};

export const createRFQ = async (req, res, next) => {
  try {
    const rfq = await RFQ.create({ ...req.body, createdBy: req.user.id });
    await ActivityLog.create({ user: req.user.id, action: 'Created RFQ', entity: 'RFQ', entityId: rfq._id });
    res.status(201).json(rfq);
  } catch (err) { next(err); }
};

export const updateRFQ = async (req, res, next) => {
  try {
    const rfq = await RFQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(rfq);
  } catch (err) { next(err); }
};