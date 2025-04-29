const Setting = require('../models/Setting');

// Get all settings - mostly for admin purposes
const getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.find().populate('user_id', 'name email');
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get settings for a specific user
const getUserSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne({ user_id: req.params.userId });
    
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found for this user' });
    }
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new settings for a user
const createSettings = async (req, res) => {
  try {
    // Check if settings already exist for this user
    const existingSettings = await Setting.findOne({ user_id: req.body.user_id });
    if (existingSettings) {
      return res.status(400).json({ message: 'Settings already exist for this user' });
    }
    
    const settings = new Setting({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    const savedSettings = await settings.save();
    res.status(201).json(savedSettings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update settings for a user
const updateSettings = async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate(
      { user_id: req.params.userId },
      { 
        ...req.body,
        updated_at: new Date()
      },
      { new: true, upsert: true }
    );
    
    res.json(settings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete settings for a user - rarely used but included for completeness
const deleteSettings = async (req, res) => {
  try {
    const settings = await Setting.findOneAndDelete({ user_id: req.params.userId });
    
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found for this user' });
    }
    
    res.json({ message: 'Settings deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSettings,
  getUserSettings,
  createSettings,
  updateSettings,
  deleteSettings
};