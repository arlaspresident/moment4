const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');

const router = express.Router();

// post /api/register
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  // kontroll båda fält måste finnas
  if (!username || !password) {
    return res.status(400).json({ message: 'fyll i både användarnamn och lösenord.' });
  }

}
