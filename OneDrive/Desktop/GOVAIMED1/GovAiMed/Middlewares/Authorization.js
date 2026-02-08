const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel'); // ou User selon ton fichier

// =====================
// Middleware: authorize
// Vérifie que l'utilisateur est connecté (token JWT)
// =====================
const authorize = async (req, res, next) => {
  try {
    // 1️⃣ Récupérer le token depuis le header Authorization ou cookie
    let token = req.headers.authorization?.split(' ')[1];
    if (!token && req.cookies) token = req.cookies.token;

    if (!token) return res.status(401).json({ message: "Token manquant" });

    // 2️⃣ Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Token invalide" });

    // 3️⃣ Chercher l'utilisateur correspondant dans la DB
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Utilisateur introuvable" });

    // 4️⃣ Stocker les infos utiles pour les routes suivantes
    req.user = { id: user._id, role: user.role };
    req.token = token;

    next();
  } catch (err) {
    console.error("Authorize Error:", err);
    return res.status(401).json({ message: "Please authenticate" });
  }
};

// =====================
// Middleware: authorizeAdmin
// Vérifie que l'utilisateur est Admin
// =====================
const authorizeAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Please authenticate" });
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
};

// =====================
// Middleware combiné: authorize + Admin
// =====================
const authorizeAdminCombined = async (req, res, next) => {
  try {
    await authorize(req, res, async () => {
      if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: "Admins only" });
      }
      next();
    });
  } catch (err) {
    console.error("authorizeAdminCombined Error:", err);
    return res.status(401).json({ message: "Please authenticate" });
  }
};

module.exports = {
  authorize,
  authorizeAdmin,
  authorizeAdminCombined
};