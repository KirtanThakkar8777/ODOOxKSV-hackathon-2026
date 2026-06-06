import { Router } from 'express';
import { getVendors, createVendor, updateVendor, deleteVendor } from '../controllers/vendor.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/',getVendors);
router.post('/',requireRole('admin','officer'),createVendor);
router.put('/:id',requireRole('admin','officer'),updateVendor);
router.delete('/:id',requireRole('admin'),deleteVendor);

export default router;