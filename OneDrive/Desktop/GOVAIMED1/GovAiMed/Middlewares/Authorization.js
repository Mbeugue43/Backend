const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

// Authorization middleware
const authorize = async (req, res, next) => {
  try {
    // 1️⃣ Essaye de récupérer le token depuis le header Authorization
    let token = req.header("Authorization")?.replace('Bearer ', '');

    // 2️⃣ Si pas de header, récupère depuis le cookie
    if (!token && req.cookies) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "Token manquant" });

    // Vérifie le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Cherche l'utilisateur correspondant
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();

    // Stocke user et token pour les routes suivantes
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Please authenticate" });
  }
};

// Admin Authorization middleware (doit être utilisé après authorize)
const authorizeAdmin = async (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Please authenticate" });
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

// Middleware combiné : authorize + authorizeAdmin
const authorizeAdminCombined = async (req, res, next) => {
  try {
    // 1️⃣ Récupérer et vérifier le token (comme authorize)
    let token = req.header("Authorization")?.replace('Bearer ', '');
    
    if (!token && req.cookies) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ message: "Token manquant" });

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Chercher l'utilisateur correspondant
    const user = await User.findById(decoded.id);
    if (!user) throw new Error();

    // Stocker user et token
    req.user = user;
    req.token = token;

    // 2️⃣ Vérifier que c'est un Admin
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: "Admins only" });
    }
    
    next();
  } catch (err) {
    return res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = {
  authorize,
  authorizeAdmin,
  authorizeAdminCombined
};
