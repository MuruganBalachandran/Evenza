const mongoose = require('mongoose');

const eventTemplateSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  data: Object,
  created_at: {
    type: Date,
    default: Date.now
  }
}, {  collection: 'EventTemplates', }); 

module.exports = mongoose.model('EventTemplates', eventTemplateSchema);