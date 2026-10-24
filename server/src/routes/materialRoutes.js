import express from 'express';
import { createMaterial, getMaterials, getMaterialById, updateMaterial, deleteMaterial } from '../controllers/materialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getMaterials);
router.get('/:id', getMaterialById);
router.post('/', protect, authorizeRoles('teacher', 'admin'), upload.single('file'), createMaterial);
router.put('/:id', protect, updateMaterial);
router.delete('/:id', protect, deleteMaterial);

export default router;
