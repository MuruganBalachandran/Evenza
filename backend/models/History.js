const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  hoster: {
    type: String,
    required: true
  },
  numAttendees: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['completed', 'cancelled'],
    required: true
  },
  endedAt: Date
}, { 
  collection: 'History',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('History', historySchema);