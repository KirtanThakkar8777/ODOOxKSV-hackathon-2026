import api from '../../../services/api';

export const activityLogService = {
  getAll: (params) => api.get('/activity-logs', { params }),
  getAuditTrail: (params) => api.get('/activity-logs/audit', { params }),
  getStats: () => api.get('/activity-logs/stats'),
  getByEntity: (entityType, entityId) => api.get(`/activity-logs/entity/${entityType}/${entityId}`),
  getByUser: (userId) => api.get(`/activity-logs/user/${userId}`),
};