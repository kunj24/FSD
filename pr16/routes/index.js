const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

// GET home page (contact form)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Me', errors: null, formData: {} });
});

// POST contact form
router.post('/contact', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('message').trim().notEmpty().withMessage('Message cannot be empty').isLength({ max: 2000 }).withMessage('Message too long')
], async function(req, res, next) {
  const errors = validationResult(req);
  const formData = { name: req.body.name, email: req.body.email, message: req.body.message };

  if (!errors.isEmpty()) {
    return res.status(400).render('index', { title: 'Contact Me', errors: errors.array(), formData });
  }

  // Create transporter using environment SMTP settings or Ethereal for dev
  let transporter;
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      // create ethereal test account
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    }

    const mailOptions = {
      from: `"${formData.name}" <${formData.email}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'noreply@example.com',
      subject: `New contact message from ${formData.name}`,
      text: `${formData.message}\n\nFrom: ${formData.name} <${formData.email}>`,
      html: `<p>${formData.message.replace(/\n/g, '<br>')}</p><hr><p>From: <strong>${formData.name}</strong> &lt;${formData.email}&gt;</p>`
    };

    const info = await transporter.sendMail(mailOptions);

    // If using Ethereal, provide preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);

    return res.render('index', { title: 'Contact Me', success: true, previewUrl, formData: {} , errors: null });
  } catch (err) {
    console.error('Error sending mail:', err);
    return res.status(500).render('index', { title: 'Contact Me', success: false, errorMessage: 'Failed to send message. Please try again later.', formData, errors: null });
  }
});

module.exports = router;
