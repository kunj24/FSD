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

// Home route - Dashboard page for team onboarding
app.get('/home', (req, res) => {
  const greeting = {
    message: '🚀 Welcome to Your Team Dashboard!',
    description: 'This is your Express.js project template for team onboarding',
    teamInfo: {
      purpose: 'Base template for future web applications',
      features: ['Express.js server', 'Dashboard route', 'Health monitoring', 'Error handling'],
      nextSteps: 'Customize this template for your specific needs'
    },
    timestamp: new Date().toISOString(),
    availableRoutes: {
      home: '/home - Team dashboard (current page)',
      health: '/health - Server health check',
      api: '/api/* - Future API endpoints',
      root: '/ - Redirects to dashboard'
    },
    developmentTips: {
      dev: 'Use npm run dev for development with auto-restart',
      production: 'Use npm start for production',
      customization: 'Add new routes, middleware, and features as needed'
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

// Sample API routes for team to extend
app.get('/api/status', (req, res) => {
  res.json({
    api: 'Team Template API',
    version: '1.0.0',
    status: 'active',
    endpoints: ['/api/status', '/api/team'],
    message: 'Add your custom API endpoints here'
  });
});

app.get('/api/team', (req, res) => {
  res.json({
    message: 'Team information endpoint',
    template: 'This is where you can add team-specific data',
    example: {
      teamName: 'Development Team',
      members: ['Add', 'team', 'members', 'here'],
      projects: ['Express Template', 'Future Projects']
    }
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.originalUrl} does not exist`,
    availableRoutes: ['/home', '/health', '/api/status', '/api/team'],
    tip: 'Visit /home for the main dashboard'
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