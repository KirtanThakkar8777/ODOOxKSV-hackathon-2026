import { Router } from 'express';
import {
  exportReport,
  getDashboardReport,
  getProcurementReport,
  getSpendReport,
  getVendorReport,
} from '../controllers/report.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/dashboard', getDashboardReport);
router.get('/procurement', getProcurementReport);
router.get('/vendor', getVendorReport);
router.get('/spend', getSpendReport);
router.get('/export/:type', exportReport);

export default router;
