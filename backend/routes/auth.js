const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Set a secret key (in production, this should be in .env)
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key_for_real_estate';

// --- LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Check if admin exists
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Generate Token
    const payload = {
      admin: {
        id: admin._id
      }
    };

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- HELPER: SEED INITIAL ADMIN ---
// In a real app you'd run this once or via a secure script.
// We'll leave this open momentarily just to create the first admin user
router.post('/seed', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if an admin already exists
    const existingAdmins = await Admin.countDocuments();
    if (existingAdmins > 0) {
      return res.status(400).json({ message: 'Admin already exists. Cannot re-seed.' });
    }

    const admin = new Admin({ username, password });
    await admin.save();
    
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
