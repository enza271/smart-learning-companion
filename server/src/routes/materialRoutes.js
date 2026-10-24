import materialController from '../controllers/materialController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', materialController.getMaterials);
router.get('/my', protect, materialController.getMyMaterials);
router.get('/:id', protect, materialController.getMaterialById);
router.post('/', protect, authorizeRoles('teacher', 'admin'), upload.single('file'), materialController.createMaterial);
router.put('/:id', protect, materialController.updateMaterial);
router.delete('/:id', protect, materialController.deleteMaterial);

export default router;
