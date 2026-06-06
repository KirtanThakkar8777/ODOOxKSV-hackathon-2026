import { Router } from 'express';
import { submitQuotation, getQuotationsByRFQ, acceptQuotation } from '../controllers/quotation.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.post('/',                      requireRole('vendor'),          submitQuotation);
router.get('/rfq/:rfqId',             requireRole('officer','admin'), getQuotationsByRFQ);
router.put('/:id/accept',             requireRole('officer','admin'), acceptQuotation);

export default router;