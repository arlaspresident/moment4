const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'ingen token skickades.' });
  }

  const token = authHeader.split(' ')[1]; // plockar ut själva token

  // extra säkerhet om de ändå inte finns nån token
  if (!token) {
    return res.status(401).json({ message: 'token saknas.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'ogiltig token.' });
    }

    req.user = user; // lagra användardata för sen
    next(); // gå vidare till nästa steg 
  });
}

module.exports = verifyToken;
