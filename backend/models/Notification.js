const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  type: {
    type: String,
    enum: ['Events', 'RSVPs', 'Reminders', 'Unread'],
    required: true
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  is_read: {
    type: Boolean,
    default: false
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events'
  },
  event_title: String,
  action_required: {
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
}, { 
  collection: 'Notifications',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Notifications', notificationSchema);