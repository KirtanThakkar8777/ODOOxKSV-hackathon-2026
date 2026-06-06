import { Router } from 'express';
import { deleteInvoice, generateInvoice, getInvoices, sendInvoice } from '../controllers/invoice.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/',             getInvoices);
router.post('/',            requireRole('officer','admin'), generateInvoice);
router.post('/:id/send',    requireRole('officer','admin'), sendInvoice);
router.delete('/:id',       requireRole('admin'), deleteInvoice);

export default router;
