
const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o con formato incorrecto.'});
  }

  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    req.usuario = user;
    next();
  });
};

exports.permisoAdmin = (req, res, next) => {
  if (req.usuario.rol === 'Admin' || req.usuario.rol === 'SuperAdmin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acceso restringido a Administradores.' });
  }
};

exports.permisoSuperAdmin = (req, res, next) => {
  if (req.usuario.rol === 'SuperAdmin') {
    next();
  } else {
    return res.status(403).json({ message: 'Acción permitida solo para SuperAdmin.' });
  }
};