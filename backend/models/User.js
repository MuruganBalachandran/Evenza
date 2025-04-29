const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: () => new mongoose.Types.ObjectId()
  },
  user_id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  passwordHash: String,
  profile_image: String,
  cover_image: String,
  role: {
    type: String,
    default: 'Member'
  },
  bio: String,
  location: {
    city: String,
    state: String,
    country: String
  },
  social_links: {
    linkedin: String,
    twitter: String,
    website: String
  },
  preferences: {
    language: { type: String, default: 'en' },
    theme: { type: String, default: 'light' },
    email_notifications: { type: Boolean, default: true },
    sms_notifications: { type: Boolean, default: false }
  },
  stats: {
    total_events: { type: Number, default: 0 },
    events_attended: { type: Number, default: 0 },
    saved_events: { type: Number, default: 0 }
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { collection: 'Users' });

module.exports = mongoose.model('Users', userSchema);