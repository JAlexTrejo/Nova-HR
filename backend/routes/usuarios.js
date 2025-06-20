
const express = require('express');
const router = express.Router();
const {
  listarUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} = require('../controllers/usuariosController');

const {
  verificarToken,
  permisoAdmin,
  permisoSuperAdmin
} = require('../middlewares/authMiddleware');

// Todas requieren token
router.use(verificarToken);

// Ver lista de usuarios (admin/superadmin)
router.get('/', permisoAdmin, listarUsuarios);

// Crear nuevo usuario (admin/superadmin)
router.post('/', permisoAdmin, crearUsuario);

// Editar usuario por ID (admin/superadmin)
router.put('/:id', permisoAdmin, actualizarUsuario);

// Eliminar usuario (solo superadmin)
router.delete('/:id', permisoSuperAdmin, eliminarUsuario);

module.exports = router;
