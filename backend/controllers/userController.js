const User = require('../models/User');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { ...updates, updated_at: new Date() },
      { new: true }
    ).select('-passwordHash');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile
};