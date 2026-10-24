import User from '../models/User.js';
import Material from '../models/Material.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch users' });
  }
};

export const getAdminDashboard = async (req, res) => {
  try {
    const [users, materials] = await Promise.all([
      User.countDocuments(),
      Material.countDocuments(),
    ]);

    res.json({
      stats: {
        users,
        materials,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to load admin dashboard' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to delete user' });
  }
};
