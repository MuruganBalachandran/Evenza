const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  category: String,
  banner_url: String,
  start_time: Date,
  end_time: Date,
  venue_type: String,
  venue_details: Object,
  is_public: Boolean,
  attendee_limit: Number,
  status: {
    type: String,
    enum: ['draft', 'active', 'completed', 'cancelled'],
    default: 'draft'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { collection: 'Events' });

module.exports = mongoose.model('Events', eventSchema);