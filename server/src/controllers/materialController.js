import Material from '../models/Material.js';
import User from '../models/User.js';

export const createMaterial = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a valid material file.' });
    }

    const { title, subject, description, visibility } = req.body;

    if (!title || !subject || !description) {
      return res.status(400).json({ message: 'Title, subject and description are required.' });
    }

    const baseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    const material = await Material.create({
      title,
      subject,
      description,
      uploadedBy: req.user.id,
      fileName: req.file.originalname,
      fileUrl,
      mimeType: req.file.mimetype,
      fileSize: req.file.size,
      visibility: visibility || 'public',
    });

    res.status(201).json({ message: 'Material uploaded successfully', material });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Material upload failed' });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const { subject, search } = req.query;
    const baseQuery = req.user
      ? {
          $or: [{ visibility: 'public' }, { uploadedBy: req.user.id }],
        }
      : { visibility: 'public' };

    const filter = { ...baseQuery };

    if (subject) {
      filter.subject = new RegExp(subject, 'i');
    }

    if (search) {
      filter.$and = [
        {
          $or: [
            { title: new RegExp(search, 'i') },
            { subject: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') },
          ],
        },
      ];
    }

    const materials = await Material.find(filter)
      .populate('uploadedBy', 'name email role')
      .sort({ createdAt: -1 });

    res.json({ materials });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch materials' });
  }
};

export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('uploadedBy', 'name email role');

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    const isOwner = req.user && material.uploadedBy && material.uploadedBy._id.toString() === req.user.id;
    const canAccess = material.visibility === 'public' || (req.user && (req.user.role === 'admin' || isOwner));

    if (!canAccess) {
      return res.status(403).json({ message: 'You do not have permission to access this file.' });
    }

    res.json({ material });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch material' });
  }
};

export const updateMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    if (material.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only update your own materials.' });
    }

    const { title, subject, description, visibility } = req.body;

    if (title) material.title = title;
    if (subject) material.subject = subject;
    if (description) material.description = description;
    if (visibility) material.visibility = visibility;

    await material.save();

    res.json({ message: 'Material updated successfully', material });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to update material' });
  }
};

export const deleteMaterial = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);

    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    if (material.uploadedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You can only delete your own materials.' });
    }

    await material.deleteOne();

    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to delete material' });
  }
};

export const getMyMaterials = async (req, res) => {
  try {
    const materials = await Material.find({ uploadedBy: req.user.id })
      .populate('uploadedBy', 'name email role')
      .sort({ createdAt: -1 });

    res.json({ materials });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch your materials' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch users' });
  }
};
