const express = require('express');
const path = require('path');

// Create Express application
const app = express();

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files (if needed later)
app.use(express.static(path.join(__dirname, 'public')));

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Home route - Dashboard page
app.get('/home', (req, res) => {
  const greeting = {
    message: 'Welcome to the Dashboard!',
    description: 'This is your team\'s Express.js project template',
    timestamp: new Date().toISOString(),
    routes: {
      home: '/home - Dashboard page (current)',
      health: '/health - Health check endpoint'
    }
  };
  
  res.json(greeting);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running properly',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root route redirect to home
app.get('/', (req, res) => {
  res.redirect('/home');
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`,
    availableRoutes: ['/home', '/health']
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Express server is running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard available at http://localhost:${PORT}/home`);
  console.log(`💚 Health check at http://localhost:${PORT}/health`);
});

module.exports = app;