const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  dark_mode: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    default: 'en'
  },
  email_optin: {
    type: Boolean,
    default: true
  },
  calendar_sync: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Settings' });

module.exports = mongoose.model('Settings', settingSchema);