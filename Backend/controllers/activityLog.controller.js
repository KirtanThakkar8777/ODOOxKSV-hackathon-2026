import ActivityLog from '../models/ActivityLog.js';

const buildFilter = (query = {}) => {
  const filter = {};
  if (query.entity) filter.entity = query.entity;
  if (query.user) filter.user = query.user;
  if (query.entityId) filter.entityId = query.entityId;
  return filter;
};

export const getActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find(buildFilter(req.query))
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(Number(req.query.limit) || 100);
    res.json(logs);
  } catch (err) { next(err); }
};

export const getAuditTrail = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find(buildFilter(req.query))
      .populate('user', 'name email role')
      .sort({ createdAt: -1 })
      .limit(Number(req.query.limit) || 200);
    res.json(logs);
  } catch (err) { next(err); }
};

export const getActivityStats = async (req, res, next) => {
  try {
    const since = new Date();
    since.setHours(0, 0, 0, 0);

    const [total, today, byEntity] = await Promise.all([
      ActivityLog.countDocuments(),
      ActivityLog.countDocuments({ createdAt: { $gte: since } }),
      ActivityLog.aggregate([
        { $group: { _id: '$entity', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    res.json({
      total,
      today,
      byEntity: byEntity.reduce((acc, item) => {
        acc[item._id || 'Unknown'] = item.count;
        return acc;
      }, {}),
    });
  } catch (err) { next(err); }
};

export const getLogsByEntity = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({
      entity: req.params.entityType,
      entityId: req.params.entityId,
    })
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) { next(err); }
};

export const getLogsByUser = async (req, res, next) => {
  try {
    const logs = await ActivityLog.find({ user: req.params.userId })
      .populate('user', 'name email role')
      .sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) { next(err); }
};
