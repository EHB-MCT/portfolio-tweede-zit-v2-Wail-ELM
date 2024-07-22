const knex = require('../config/knex');

const getQuestions = async (req, res) => {
  const questions = await knex('questions').select('*');
  res.json(questions);
};

const createQuestion = async (req, res) => {
  const { content, user_id } = req.body;
  const [id] = await knex('questions').insert({ content, user_id }).returning('id');
  res.status(201).json({ message: 'Question created', id });
};

module.exports = { getQuestions, createQuestion };
