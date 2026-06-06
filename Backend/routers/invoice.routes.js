import { Router } from 'express';
import { generateInvoice, getInvoices, sendInvoice } from '../controllers/invoice.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/',             getInvoices);
router.post('/',            requireRole('officer','admin'), generateInvoice);
router.post('/:id/send',    requireRole('officer','admin'), sendInvoice);

export default router;