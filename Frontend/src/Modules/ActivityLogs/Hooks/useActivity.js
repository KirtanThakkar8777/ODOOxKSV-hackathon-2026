import api from "../../../services/api";

const activityLogService = {
  getActivities: async () => {
    const response = await api.get(
      "/activity-logs"
    );

    return response.data;
  },

  getAuditTrail: async () => {
    const response = await api.get(
      "/activity-logs/audit"
    );

    return response.data;
  },
};

export default activityLogService;