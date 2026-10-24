import express from 'express';
import { getAdminDashboard, getAllUsers } from '../controllers/userController.js';
import { getAdminMaterials, removeMaterialByAdmin } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();

router.get('/dashboard', protect, authorizeRoles('admin'), getAdminDashboard);
router.get('/users', protect, authorizeRoles('admin'), getAllUsers);
router.get('/materials', protect, authorizeRoles('admin'), getAdminMaterials);
router.delete('/materials/:id', protect, authorizeRoles('admin'), removeMaterialByAdmin);

export default router;
