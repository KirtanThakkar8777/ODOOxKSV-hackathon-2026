import { Router } from 'express';
import { createOrder, getOrders, approveOrder, deleteOrder } from '../controllers/order.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyToken);

router.get('/',               getOrders);
router.post('/',              requireRole('officer','admin'), createOrder);
router.put('/:id/approve',    requireRole('manager','admin'), approveOrder);
router.delete('/:id',         requireRole('admin'), deleteOrder);

export default router;
