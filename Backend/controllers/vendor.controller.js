import Vendor from '../models/vendor.js';
import ActivityLog from '../models/ActivityLog.js';

export const getVendors = async (req, res, next) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};
    if (search)   filter.name = { $regex: search, $options: 'i' };
    if (category) filter.category = category;
    if (status)   filter.status = status;
    const vendors = await Vendor.find(filter).sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) { next(err); }
};

export const createVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.create(req.body);
    await ActivityLog.create({ user: req.user.id, action: 'Created Vendor', entity: 'Vendor', entityId: vendor._id });
    res.status(201).json(vendor);
  } catch (err) { next(err); }
};

export const updateVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vendor);
  } catch (err) { next(err); }
};

export const deleteVendor = async (req, res, next) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor deleted' });
  } catch (err) { next(err); }
};
