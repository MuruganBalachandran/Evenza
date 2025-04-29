const Event = require('../models/Events');
const Attendee = require('../models/Attendee');

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate('user_id', 'name profile_image')
      .sort({ created_at: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single event
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('user_id', 'name profile_image');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create event
const createEvent = async (req, res) => {
  try {
    const event = await new Event({
      ...req.body,
      user_id: req.user.id,
      created_at: new Date(),
      updated_at: new Date()
    }).save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { ...req.body, updated_at: new Date() },
      { new: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete event
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      user_id: req.user.id
    });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await Attendee.deleteMany({ event_id: req.params.id });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent
};