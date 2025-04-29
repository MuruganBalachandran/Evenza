const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Events',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  rsvp_status: String,
  joined_at: Date
}, { collection: 'Attendees' });

module.exports = mongoose.model('Attendees', attendeeSchema);