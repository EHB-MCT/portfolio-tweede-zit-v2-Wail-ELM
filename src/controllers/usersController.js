const knex = require('../config/knex');

exports.findAll = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.sendStatus(403);
  }
  try {
    const users = await knex('users').select('*');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findById = async (req, res) => {
  if (req.user.role !== 'admin' && req.user.id !== parseInt(req.params.id)) {
    return res.sendStatus(403);
  }
  try {
    const user = await knex('users').where({ id: req.params.id }).first();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
    return res.sendStatus(403);
  }
  const { name, email, role } = req.body;
  try {
    await knex('users').where({ id }).update({ name, email, role });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  if (req.user.role !== 'admin' && req.user.id !== parseInt(id)) {
    return res.sendStatus(403);
  }
  try {
    await knex('users').where({ id }).del();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
