# Express.js Project Template

A basic Express.js application template for team onboarding with a dashboard home route.

## Features

- ✅ Express.js server setup
- ✅ `/home` route serving as dashboard page
- ✅ Health check endpoint
- ✅ Basic middleware (JSON parsing, static files, logging)
- ✅ Error handling
- ✅ Development and production scripts

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

## API Endpoints

### GET /home
Dashboard page with welcome message and available routes.

**Response:**
```json
{
  "message": "Welcome to the Dashboard!",
  "description": "This is your team's Express.js project template",
  "timestamp": "2025-09-23T...",
  "routes": {
    "home": "/home - Dashboard page (current)",
    "health": "/health - Health check endpoint"
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

## Next Steps

This template serves as a foundation for:
- REST API development
- Dashboard applications
- Microservices
- Full-stack web applications

## Dependencies

- **express**: Web framework for Node.js
- **nodemon**: Development dependency for auto-restarting

## License

ISC