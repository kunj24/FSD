const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Student = require('./models/Student');

const app = express();
const PORT = 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tuition_admin').then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Routes

// Dashboard - View all students
app.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.render('dashboard', { students, message: null, error: null });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.render('dashboard', { students: [], message: null, error: 'Failed to load students' });
  }
});

// Add student form
app.get('/add', (req, res) => {
  res.render('add-student', { error: null, formData: {} });
});

// Create new student
app.post('/students', async (req, res) => {
  try {
    const { name, email, phone, grade, subject, feesPaid } = req.body;
    
    // Basic validation
    if (!name || !email || !phone || !grade || !subject) {
      return res.render('add-student', {
        error: 'All fields are required',
        formData: req.body
      });
    }
    
    const student = new Student({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      grade: grade.trim(),
      subject: subject.trim(),
      feesPaid: feesPaid === 'on' || feesPaid === 'true'
    });
    
    await student.save();
    
    const students = await Student.find().sort({ createdAt: -1 });
    res.render('dashboard', { 
      students, 
      message: 'Student added successfully!', 
      error: null 
    });
  } catch (error) {
    console.error('Error adding student:', error);
    if (error.code === 11000) {
      res.render('add-student', {
        error: 'Email already exists',
        formData: req.body
      });
    } else {
      res.render('add-student', {
        error: 'Failed to add student',
        formData: req.body
      });
    }
  }
});

// Edit student form
app.get('/edit/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.redirect('/?error=Student not found');
    }
    res.render('edit-student', { student, error: null });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.redirect('/?error=Failed to load student');
  }
});

// Update student
app.put('/students/:id', async (req, res) => {
  try {
    const { name, email, phone, grade, subject, feesPaid } = req.body;
    
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        grade: grade.trim(),
        subject: subject.trim(),
        feesPaid: feesPaid === 'on' || feesPaid === 'true',
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedStudent) {
      return res.redirect('/?error=Student not found');
    }
    
    res.redirect('/?message=Student updated successfully');
  } catch (error) {
    console.error('Error updating student:', error);
    const student = await Student.findById(req.params.id);
    res.render('edit-student', {
      student,
      error: 'Failed to update student'
    });
  }
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.redirect('/?error=Student not found');
    }
    res.redirect('/?message=Student deleted successfully');
  } catch (error) {
    console.error('Error deleting student:', error);
    res.redirect('/?error=Failed to delete student');
  }
});

// API Routes for JSON responses
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

app.listen(PORT, () => {
  console.log(`Tuition Admin Panel running on http://localhost:${PORT}`);
});