// laddar in nödvändiga paket
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// aktiverar .env
dotenv.config();

// startar express
const app = express();

// middleware för att tolka json och hantera cors
app.use(express.json());
app.use(cors());

// importerar routes 
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes); //alla routes kommer börja med /api

// startar servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servern körs på http://localhost:${PORT}`);
});
