const express = require('express');
const router = express.Router();

// Helper function to validate and parse income input
function validateIncomeInput(value) {
  // Remove any whitespace
  const trimmed = String(value || '').trim();
  
  // Check if empty
  if (!trimmed) {
    return { isValid: false, error: 'Income field cannot be empty' };
  }
  
  // Remove commas and currency symbols for parsing
  const cleaned = trimmed.replace(/[₹,]/g, '');
  
  // Check if it's a valid number
  const parsed = parseFloat(cleaned);
  
  if (isNaN(parsed)) {
    return { isValid: false, error: 'Please enter a valid number' };
  }
  
  // Check if it's negative
  if (parsed < 0) {
    return { isValid: false, error: 'Income cannot be negative' };
  }
  
  // Check if it's too large (reasonable limit)
  if (parsed > 999999999) {
    return { isValid: false, error: 'Income amount is too large' };
  }
  
  return { isValid: true, value: parsed };
}

// Helper function to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2
  }).format(amount);
}

/* GET home page - display the tax form */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Tax Income Calculator',
    errors: null,
    formData: null
  });
});

/* POST calculate total income */
router.post('/calculate', function(req, res, next) {
  const { income1, income2 } = req.body;
  
  // Validate both income inputs
  const income1Validation = validateIncomeInput(income1);
  const income2Validation = validateIncomeInput(income2);
  
  const errors = {};
  
  if (!income1Validation.isValid) {
    errors.income1 = income1Validation.error;
  }
  
  if (!income2Validation.isValid) {
    errors.income2 = income2Validation.error;
  }
  
  // If there are validation errors, redisplay the form
  if (Object.keys(errors).length > 0) {
    return res.render('index', {
      title: 'Tax Income Calculator',
      errors: errors,
      formData: { income1, income2 }
    });
  }
  
  // Perform server-side calculation
  const totalIncome = income1Validation.value + income2Validation.value;
  
  // Render results page
  res.render('results', {
    title: 'Income Calculation Results',
    income1: income1Validation.value,
    income2: income2Validation.value,
    totalIncome: totalIncome,
    formatCurrency: formatCurrency
  });
});

module.exports = router;