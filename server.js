// Install dependencies first: npm install express axios chart.js body-parser mongoose

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/timeManagementApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  description: String,
});

const Event = mongoose.model('Event', eventSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.post('/api/events', async (req, res) => {
    const newEvent = new Event({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description || '',
      });
      await newEvent.save();
      res.json(newEvent);
    });
    
    app.get('/api/events', async (req, res) => {
      const events = await Event.find();
      res.json(events);
    });
    
    app.patch('/api/events/:id', async (req, res) => {
      const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedEvent);
    });
    
    app.delete('/api/events/:id', async (req, res) => {
      await Event.findByIdAndDelete(req.params.id);
      res.json({ message: 'Event deleted successfully' });
    });
    
    // Start Server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    
    // Directory Structure:
    // - public
    //   - styles.css
    //   - index.html
    //   - about.html
    //   - dashboard.html
    
    // Example index.html (public/index.html):
    /*
    <!DOCTYPE html>
    <html>
    <head>
      <title>Home</title>
      <link rel="stylesheet" href="styles.css">
      </head>
<body>
  <h1>Welcome to the Student Time Management Application</h1>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/dashboard">Dashboard</a>
  </nav>
</body>
</html>
*/

// Example about.html (public/about.html):
/*
<!DOCTYPE html>
<html>
<head>
  <title>About</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>About This App</h1>
  <p>This app helps students plan their schedules, reduce stress, and improve academic performance.</p>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/dashboard">Dashboard</a>
  </nav>
</body>
</html>
*/

// Example dashboard.html (public/dashboard.html):
/*
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>Event Dashboard</h1>
  <form id="event-form">
    <input type="text" id="title" placeholder="Event Title">
    <input type="date" id="date">
    <textarea id="description" placeholder="Event Description"></textarea>
    <button type="submit">Add Event</button>
  </form>
  <ul id="event-list"></ul>
  <script src="dashboard.js"></script>
</body>
</html>
*/
