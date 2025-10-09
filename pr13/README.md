# Tax Income Calculator

A professional tax form website built with Express.js and EJS that allows users to enter income from two sources and calculates the total income with server-side validation.

## Features

- **Server-side Calculations**: All calculations performed securely on the server
- **Input Validation**: Comprehensive validation for income inputs
- **Clean Interface**: User-friendly, responsive design
- **EJS Templates**: Dynamic server-side rendering
- **Error Handling**: Proper error messages and validation feedback
- **Print Support**: Print-friendly results page
- **Accessibility**: Proper labels and form structure

## Project Structure

```
practical-13/
├── app.js                 # Main Express application
├── package.json           # Dependencies and scripts
├── bin/
│   └── www               # Server startup script
├── public/
│   └── stylesheets/
│       └── style.css     # CSS styles
├── routes/
│   └── index.js          # Main routes with validation
└── views/
    ├── index.ejs         # Tax form page
    ├── results.ejs       # Results display page
    └── error.ejs         # Error page
```

## Setup Instructions

1. **Navigate to the project directory:**
   ```cmd
   cd /d "d:\Sem 5\FSD\FSD-Practicals\practical-13"
   ```

2. **Install dependencies:**
   ```cmd
   npm install
   ```

3. **Start the server:**
   ```cmd
   npm start
   ```
   
   Or for development with auto-restart:
   ```cmd
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to: http://localhost:3000

## How to Use

1. **Enter Income Sources:**
   - Input your first income source (e.g., salary, wages)
   - Input your second income source (e.g., freelance, business income)
   - Both fields accept various formats: `50000`, `$50,000`, `50000.00`

2. **Submit Form:**
   - Click "Calculate Total Income" button
   - Form data is sent via POST request to server

3. **View Results:**
   - See breakdown of both income sources
   - View calculated total income
   - Print results if needed

4. **Error Handling:**
   - Invalid inputs show specific error messages
   - Form preserves valid data when errors occur
   - All validation happens on the server

## Validation Rules

- **Required Fields**: Both income sources must be provided
- **Numeric Values**: Only valid numbers accepted
- **Non-negative**: Income cannot be negative
- **Maximum Limit**: Income per source limited to $999,999,999
- **Format Flexibility**: Accepts various input formats (with/without $, commas)

## Security Features

- **Server-side Only**: No client-side calculations for security
- **Input Sanitization**: All inputs properly validated and sanitized
- **Error Prevention**: Comprehensive error handling prevents crashes
- **XSS Protection**: EJS templates properly escape user input

## Technical Details

- **Framework**: Express.js 4.18+
- **Template Engine**: EJS 3.1+
- **Styling**: Custom CSS with responsive design
- **Validation**: Server-side input validation
- **Error Handling**: Comprehensive error pages and messages

## Development Notes

- All calculations performed on server for security
- Form uses POST method for data submission
- EJS templates for dynamic content rendering
- Responsive design for mobile compatibility
- Print-friendly styling for results page

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- Print functionality supported
- No JavaScript required for core functionality