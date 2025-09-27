# 🚀 Express.js Team Onboarding Template

A comprehensive Express.js project template designed for team onboarding and as a foundation for future web applications. This template includes a dashboard route, API examples, and best practices.

## ✨ Features

- ✅ **Express.js server** with production-ready setup
- ✅ **Dashboard route** (`/home`) with team onboarding information
- ✅ **Health monitoring** endpoint for server status
- ✅ **Sample API routes** to demonstrate extension patterns
- ✅ **Comprehensive middleware** (JSON parsing, static files, logging)
- ✅ **Professional error handling** (404, 500, global error handler)
- ✅ **Development tools** (nodemon for auto-restart)
- ✅ **Team-friendly documentation** and examples

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

### 3. Access the Application

- **Dashboard/Home:** http://localhost:3000/home
- **Health Check:** http://localhost:3000/health
- **Root redirect:** http://localhost:3000/ (redirects to /home)

## 🛣️ API Endpoints

### GET /home - Team Dashboard
The main dashboard route designed for team onboarding with comprehensive information.

**Response:**
```json
{
  "message": "🚀 Welcome to Your Team Dashboard!",
  "description": "This is your Express.js project template for team onboarding",
  "teamInfo": {
    "purpose": "Base template for future web applications",
    "features": ["Express.js server", "Dashboard route", "Health monitoring", "Error handling"],
    "nextSteps": "Customize this template for your specific needs"
  },
  "availableRoutes": {
    "home": "/home - Team dashboard (current page)",
    "health": "/health - Server health check",
    "api": "/api/* - Future API endpoints"
  },
  "developmentTips": {
    "dev": "Use npm run dev for development with auto-restart",
    "production": "Use npm start for production"
  }
}
```

### GET /api/status - API Status
Sample API endpoint showing how to extend the template.

**Response:**
```json
{
  "api": "Team Template API",
  "version": "1.0.0",
  "status": "active",
  "endpoints": ["/api/status", "/api/team"]
}
```

### GET /api/team - Team Information
Example endpoint for team-specific data.

**Response:**
```json
{
  "message": "Team information endpoint",
  "template": "This is where you can add team-specific data",
  "example": {
    "teamName": "Development Team",
    "members": ["Add", "team", "members", "here"]
  }
}
```

### GET /health
Health check endpoint for monitoring server status.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running properly",
  "uptime": 123.456,
  "timestamp": "2025-09-23T..."
}
```

## Project Structure

```
express-template/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── README.md          # Project documentation
└── .gitignore         # Git ignore rules
```

## Environment Variables

- `PORT` - Server port (default: 3000)

Example:
```bash
PORT=8080 npm start
```

## Development

### Adding New Routes

Add new routes in `server.js`:

```javascript
app.get('/api/users', (req, res) => {
  res.json({ users: [] });
});
```

### Adding Middleware

Add custom middleware before routes:

```javascript
app.use('/api', authMiddleware);
```

## 🎯 Team Onboarding Guide

### For New Team Members:
1. **Clone and explore** this template to understand the structure
2. **Run the server** and visit `/home` to see the dashboard
3. **Check out the API examples** at `/api/status` and `/api/team`
4. **Read the code** in `server.js` to understand the patterns

### For Project Leads:
1. **Customize the `/home` route** with project-specific information
2. **Add authentication** middleware if needed
3. **Extend the API routes** with project requirements
4. **Update team information** in the `/api/team` endpoint

## 🚀 Next Steps

This template serves as a foundation for:
- **REST API development** with structured endpoints
- **Dashboard applications** with the `/home` route as starting point
- **Microservices** with health monitoring built-in
- **Full-stack web applications** with frontend integration ready
- **Team collaboration** with consistent patterns and documentation

## 📦 Dependencies

- **express**: Fast, unopinionated web framework for Node.js
- **nodemon**: Development tool for automatic server restart

## 🤝 Contributing

1. Follow the existing code patterns
2. Add documentation for new routes
3. Update the README when adding features
4. Test your changes before committing

## 📄 License

ISC - Feel free to use this template for your team projects!