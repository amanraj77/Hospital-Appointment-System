const appointmentRoutes = require('./routes/appointmentRoutes');
const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const http = require('http');
const { initSocket } = require('./socket');
require('dotenv').config();

// Routes imports
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const symptomRoutes = require('./routes/symptomRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Express app
const app = express();

// Middleware
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
authRoutes(app);
profileRoutes(app);
symptomRoutes(app);
appointmentRoutes(app);
notificationRoutes(app);
doctorRoutes(app);
chatRoutes(app);
adminRoutes(app);
activityLogRoutes(app);
analyticsRoutes(app);
feedbackRoutes(app);

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI ?? 'mongodb://localhost/mydatabase')
  .then(() => {
    console.info('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Database error:', err);
  });

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);


server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
