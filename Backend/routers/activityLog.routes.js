import { Router } from 'express';
import {
  getActivityLogs,
  getActivityStats,
  getAuditTrail,
  getLogsByEntity,
  getLogsByUser,
} from '../controllers/activityLog.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/', getActivityLogs);
router.get('/audit', getAuditTrail);
router.get('/stats', getActivityStats);
router.get('/entity/:entityType/:entityId', getLogsByEntity);
router.get('/user/:userId', getLogsByUser);

export default router;
