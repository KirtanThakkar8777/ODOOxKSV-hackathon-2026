import { Router } from 'express';
import { getRFQs, getRFQById, createRFQ, updateRFQ } from '../controllers/rfq.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/',      getRFQs);
router.get('/:id',   getRFQById);
router.post('/',     requireRole('officer','admin'), createRFQ);
router.put('/:id',   requireRole('officer','admin'), updateRFQ);

export default router;