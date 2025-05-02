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

  // hasha lösenordet
  const hashedPassword = bcrypt.hashSync(password, 10); 

  // spara användaren i databasen
  const createdAt = new Date().toISOString(); // datum i textformat
  const sql = `INSERT INTO users (username, password, account_created) VALUES (?, ?, ?)`;

  db.run(sql, [username, hashedPassword, createdAt], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ message: 'användarnamnet är redan taget.' });
      }
      return res.status(500).json({ message: 'fel vid registrering.' });
    }

    res.status(201).json({ message: 'användare registrerad', userId: this.lastID });
  });
});

module.exports = router;
