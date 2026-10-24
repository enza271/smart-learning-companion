import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Smart Learning Companion API' });
});

router.post('/upload', protect, authorizeRoles('teacher', 'admin'), upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Please upload a file.' });
  }

  const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
  res.status(201).json({ message: 'File uploaded successfully', fileUrl });
});

export default router;
