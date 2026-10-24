import User from '../models/User.js';
import Material from '../models/Material.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to load users' });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const [users, materials] = await Promise.all([
      User.countDocuments(),
      Material.countDocuments(),
    ]);

    res.json({ stats: { users, materials } });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to load admin dashboard' });
  }
};

export const getAdminMaterials = async (req, res) => {
  try {
    const materials = await Material.find({}).populate('uploadedBy', 'name email role').sort({ createdAt: -1 });
    res.json({ materials });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to load materials' });
  }
};

export const removeMaterialByAdmin = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    await material.deleteOne();
    res.json({ message: 'Material removed by admin' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to remove material' });
  }
};
