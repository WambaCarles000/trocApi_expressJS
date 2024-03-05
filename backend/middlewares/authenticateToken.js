const jwt = require('jsonwebtoken');
const SECRET_KEY = 'wamba';




const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token absent. Veuillez vous connecter pour accéder à cette ressource.' });
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expiré. Veuillez vous reconnecter.' });
    } else {
      return res.sendStatus(403);
    }
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);

  if (decodedToken.exp && currentTimestamp > decodedToken.exp) {
    return res.status(401).json({ message: 'Token expiré. Veuillez vous reconnecter.' });
  }

  req.user = decodedToken;
  next();
};


module.exports = authenticateToken;