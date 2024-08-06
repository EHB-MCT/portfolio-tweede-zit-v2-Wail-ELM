const knex = require('../config/knex');

const getComments = async (req, res) => {
  const { answerId } = req.params;
  try {
    const comments = await knex('comments').where({ answer_id: answerId }).select('*');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createComment = async (req, res) => {
  const { content } = req.body;
  const { answerId } = req.params;
  const user_id = req.user.id;
  try {
    const [id] = await knex('comments').insert({ content, answer_id: answerId, user_id }).returning('id');
    res.status(201).json({ message: 'Comment created', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await knex('comments').where({ id }).del();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getComments, createComment, deleteComment };
