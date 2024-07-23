const knex = require('../config/knex');

exports.findAll = async (req, res) => {
  try {
    const users = await knex('users').select('*');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const [id] = await knex('users').insert({
      name,
      email,
      password, 
      role
    }).returning('id');
    res.status(201).json({ id: id, message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  try {
    await knex('users').where({ id }).update({
      name,
      email,
      role
    });
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await knex('users').where({ id }).del();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
