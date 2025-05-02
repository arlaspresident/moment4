const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/database');
const jwt = require('jsonwebtoken');

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

// post /api/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'fyll i både användarnamn och lösenord.' });
    }
  
    const sql = `SELECT * FROM users WHERE username = ?`;
  
    db.get(sql, [username], (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'serverfel' });
      }
  
      if (!user) {
        return res.status(401).json({ message: 'felaktigt användarnamn eller lösenord' });
      }
  
      const passwordMatch = bcrypt.compareSync(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: 'felaktigt användarnamn eller lösenord' });
      }
  
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return res.status(200).json({
        message: 'inloggning lyckades!',
        token: token
      });
    });
  });
  

module.exports = router;
