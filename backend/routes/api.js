const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Event = require('../models/Events');
const Attendee = require('../models/Attendee');
const Notification = require('../models/Notification');
const History = require('../models/History');
const Setting = require('../models/Setting');
const EventTemplate = require('../models/EventTemplate');
const mongoose = require('mongoose');
const path = require('path');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Test database connection and log data
router.get('/test-db', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const counts = {
      users: await User.countDocuments(),
      events: await Event.countDocuments(),
      attendees: await Attendee.countDocuments(),
      notifications: await Notification.countDocuments(),
      history: await History.countDocuments(),
      settings: await Setting.countDocuments(),
      templates: await EventTemplate.countDocuments()
    };

    res.json({ 
      message: 'Database connection successful',
      connection: {
        state: mongoose.connection.readyState,
        host: mongoose.connection.host,
        name: mongoose.connection.name
      },
      counts 
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({ 
      message: 'Database connection error', 
      error: error.message 
    });
  }
});

// User routes
router.get('/users', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    const users = await User.find().maxTimeMS(5000);
    console.log('Retrieved users:', users.length);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Retrieved user:', user.name);
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: error.message });
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        ...updates,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user:', user.name);
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/users/:id/avatar', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ message: 'No avatar file uploaded' });
    }

    const avatar = req.files.avatar;
    const fileName = `${req.params.id}-${Date.now()}-${avatar.name}`;
    const uploadPath = path.join(__dirname, '../uploads/avatars/', fileName);

    await avatar.mv(uploadPath);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { 
        profile_image: `/uploads/avatars/${fileName}`,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user avatar:', user.name);
    res.json({ profile_image: user.profile_image });
  } catch (error) {
    console.error('Error uploading avatar:', error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/users', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const { user_id, name, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { user_id }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      user_id,
      name,
      email,
      created_at: new Date(),
      updated_at: new Date()
    });

    await user.save();
    console.log('Created new user:', user.name);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', {
      message: error.message,
      stack: error.stack,
      input: req.body
    });
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

router.get('/users/email/:email', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ message: error.message });
  }
});

// Events routes
router.get('/events', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    const events = await Event.find().populate('user_id').maxTimeMS(5000);
    console.log('Retrieved events:', events.length);
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ 
      message: 'Error fetching events', 
      error: error.message 
    });
  }
});

// Add route for getting single event
router.get('/events/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    const event = await Event.findById(req.params.id)
      .populate('user_id')
      .maxTimeMS(5000);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    console.log('Retrieved event:', event._id);
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ 
      message: 'Error fetching event', 
      error: error.message 
    });
  }
});

router.post('/events', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    const newEvent = new Event({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date()
    });
    const event = await newEvent.save();

    // Create history record for the new event
    const newHistory = new History({
      user_id: req.body.user_id,
      event_id: event._id,
      title: event.title,
      date: event.start_time,
      hoster: req.body.user_id, // We'll populate this with the user's name later
      numAttendees: 0,
      status: 'completed',
      endedAt: event.end_time
    });
    await newHistory.save();

    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(400).json({ message: error.message });
  }
});

router.get('/events/user/:userId', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    const events = await Event.find({ user_id: req.params.userId })
      .populate('user_id')
      .maxTimeMS(5000);
    
    console.log(`Retrieved events for user ${req.params.userId}:`, events.length);
    res.json(events);
  } catch (error) {
    console.error('Error fetching user events:', error);
    res.status(500).json({ 
      message: 'Error fetching user events', 
      error: error.message 
    });
  }
});

// Attendees routes
router.get('/attendees', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    const attendees = await Attendee.find()
      .populate('user_id')
      .populate('event_id')
      .maxTimeMS(5000);

    const formattedHistory = history.map(record => ({
      id: record._id,
      title: record.title,
      date: record.date,
      hoster: record.hoster,
      numAttendees: record.numAttendees,
      status: record.status,
      endedAt: record.endedAt
    }));

    console.log('Formatted history records:', formattedHistory.length);
    res.json(formattedHistory);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ 
      message: 'Error fetching history', 
      error: error.message 
    });
  }
});

router.get('/users/:userId/history', async (req, res) => {
  try {
    const history = await History.find({ user_id: req.params.userId })
      .populate('event_id');
    if (!history) {
      return res.status(404).json({ message: 'No history found for this user' });
    }
    res.json(history);
  } catch (error) {
    console.error('Error fetching user history:', error);
    res.status(500).json({ message: error.message });
  }
});

// Settings routes
router.get('/settings', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    const settings = await Setting.find()
      .populate('user_id')
      .maxTimeMS(5000);
    console.log('Retrieved settings:', settings.length);
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/users/:userId/settings', async (req, res) => {
  try {
    const settings = await Setting.findOne({ user_id: req.params.userId });
    if (!settings) {
      return res.status(404).json({ message: 'No settings found for this user' });
    }
    res.json(settings);
  } catch (error) {
    console.error('Error fetching user settings:', error);
    res.status(500).json({ message: error.message });
  }
});

// EventTemplates routes
router.get('/templates', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }

    const templates = await EventTemplate.find()
      .sort({ created_at: -1 })
      .maxTimeMS(5000);

    console.log('Retrieved templates:', templates.length);
    
    if (!templates || templates.length === 0) {
      console.log('No templates found');
      return res.json([]);
    }

    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ 
      message: 'Error fetching templates', 
      error: error.message 
    });
  }
});

router.get('/users/:userId/templates', async (req, res) => {
  try {
    const templates = await EventTemplate.find({ user_id: req.params.userId })
      .sort({ created_at: -1 });
    if (!templates) {
      return res.status(404).json({ message: 'No templates found for this user' });
    }
    res.json(templates);
  } catch (error) {
    console.error('Error fetching user templates:', error);
    res.status(500).json({ message: error.message });
  }
});

// Notifications routes
router.get('/users/:userId/notifications', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    const notifications = await Notification.find({ user_id: req.params.userId })
      .sort({ created_at: -1 });
    
    // Transform the data to match frontend interface
    const transformedNotifications = notifications.map(notification => ({
      _id: notification._id,
      user_id: notification.user_id,
      type: notification.type,
      priority: notification.priority,
      title: notification.title,
      message: notification.message,
      timestamp: notification.created_at,
      isRead: notification.is_read,
      eventId: notification.event_id,
      eventTitle: notification.event_title,
      actionRequired: notification.action_required
    }));

    res.json(transformedNotifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: error.message });
  }
});

router.patch('/users/:userId/notifications/:notificationId', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.notificationId,
      { is_read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/users/:userId/notifications', async (req, res) => {
  try {
    await Notification.deleteMany({ user_id: req.params.userId });
    res.json({ message: 'All notifications cleared successfully' });
  } catch (error) {
    console.error('Error clearing notifications:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;