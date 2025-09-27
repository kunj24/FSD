var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET team dashboard page. */
router.get('/home', function(req, res, next) {
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
      root: '/ - Main page',
      users: '/users - Users route'
    },
    developmentTips: {
      dev: 'Use npm start to run the server',
      production: 'Deploy this template for production use',
      customization: 'Add new routes, middleware, and features as needed'
    }
  };
  
  res.json(greeting);
});

module.exports = router;
