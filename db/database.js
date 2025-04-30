const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// skapa en databasfil i projektmappen elr öppna om de redan finns
const db = new sqlite3.Database(path.resolve(__dirname, 'users.db'), (err) => {
  if (err) {
    console.error('fel vid anslutning till databasen:', err.message);
  } else {
    console.log('ansluten till databasen.');
  }
});

// skapa tabellen users om den inte redan finns
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    account_created TEXT NOT NULL
  )
`);

module.exports = db;
