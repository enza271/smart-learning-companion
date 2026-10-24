import Material from '../models/Material.js';

export const getAdminMaterials = async (req, res) => {
  try {
    const materials = await Material.find({}).populate('uploadedBy', 'name email role').sort({ createdAt: -1 });
    res.json({ materials });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Unable to fetch material list' });
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
