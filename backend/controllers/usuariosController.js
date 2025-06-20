
const User = require('../models/User');

exports.listarUsuarios = async (req, res) => {
  const usuarios = await User.findAll();
  res.json(usuarios);
};

exports.crearUsuario = async (req, res) => {
  try {
    const nuevo = await User.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear usuario', error: err.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar', error: err.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    await user.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(400).json({ message: 'Error al eliminar', error: err.message });
  }
};
