const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.pdf';
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  // Only allow PDF files
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

// Routes
app.get('/', (req, res) => {
  res.render('index', { message: null, error: null });
});

app.post('/upload', (req, res) => {
  upload.single('resume')(req, res, (err) => {
    if (err) {
      let errorMessage = 'Upload failed';
      
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          errorMessage = 'File too large! Maximum size allowed is 2MB.';
        } else {
          errorMessage = 'File upload error: ' + err.message;
        }
      } else if (err.message === 'Only PDF files are allowed!') {
        errorMessage = 'Invalid file type! Only PDF files are allowed.';
      }
      
      return res.render('index', { 
        message: null, 
        error: errorMessage 
      });
    }
    
    if (!req.file) {
      return res.render('index', { 
        message: null, 
        error: 'No file selected! Please choose a PDF resume to upload.' 
      });
    }
    
    const successMessage = `Resume uploaded successfully! File: ${req.file.originalname} (${(req.file.size / 1024).toFixed(2)} KB)`;
    res.render('index', { 
      message: successMessage, 
      error: null 
    });
  });
});

app.listen(PORT, () => {
  console.log(`Job Portal running on http://localhost:${PORT}`);
});
