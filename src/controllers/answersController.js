const knex = require('../config/knex');

const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  const answers = await knex('answers').where({ question_id: questionId }).select('*');
  res.json(answers);
};

const createAnswer = async (req, res) => {
  const { content, user_id } = req.body;
  const { questionId } = req.params;
  const [id] = await knex('answers').insert({ content, question_id: questionId, user_id }).returning('id');
  res.status(201).json({ message: 'Answer created', id });
};

module.exports = { getAnswers, createAnswer };
