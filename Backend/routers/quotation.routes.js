import { Router } from 'express';
import {
  acceptQuotation,
  deleteQuotation,
  getQuotationById,
  getQuotations,
  getQuotationsByRFQ,
  submitQuotation,
  updateQuotation,
} from '../controllers/quotation.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/',                       requireRole('officer','admin','vendor'), getQuotations);
router.post('/',                      requireRole('vendor'),          submitQuotation);
router.get('/rfq/:rfqId',             requireRole('officer','admin'), getQuotationsByRFQ);
router.get('/:id',                    requireRole('officer','admin','vendor'), getQuotationById);
router.put('/:id',                    requireRole('vendor','officer','admin'), updateQuotation);
router.put('/:id/accept',             requireRole('officer','admin'), acceptQuotation);
router.delete('/:id',                 requireRole('admin'), deleteQuotation);

export default router;
