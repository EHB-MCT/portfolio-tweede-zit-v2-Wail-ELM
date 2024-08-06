const knex = require('../config/knex');

const getQuestions = async (req, res) => {
  try {
    const questions = await knex('questions').select('*');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuestion = async (req, res) => {
  const { content, anonymous } = req.body;
  const user_id = anonymous ? null : req.user.id;
  try {
    const [id] = await knex('questions').insert({ content, user_id }).returning('id');
    res.status(201).json({ message: 'Question created', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await knex('questions').where({ id }).del();
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getQuestions, createQuestion, deleteQuestion };
