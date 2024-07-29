const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const knex = require('../config/knex');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [id] = await knex('users').insert({
      name,
      email,
      password: hashedPassword,
      role
    }).returning('id');
    res.status(201).json({ id, message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await knex('users').where({ email }).first();

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports = { register, login };
