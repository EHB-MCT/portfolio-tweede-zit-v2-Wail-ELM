const knex = require("../config/knex");

const getAnswers = async (req, res) => {
  const { questionId } = req.params;
  try {
    const answers = await knex("answers")
      .where({ question_id: questionId })
      .select("*");
    res.json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAnswer = async (req, res) => {
  const { content } = req.body;
  const { questionId } = req.params;
  const user_id = req.user.id;
  try {
    const [id] = await knex("answers")
      .insert({ content, question_id: questionId, user_id })
      .returning("id");
    res.status(201).json({ message: "Answer created", id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAnswerCorrect = async (req, res) => {
  const { id } = req.params;
  try {
    await knex("answers").where({ id }).update({ correct: true });
    res.json({ message: "Answer marked as correct" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAnswer = async (req, res) => {
  const { id } = req.params;
  try {
    await knex("answers").where({ id }).del();
    res.json({ message: "Answer deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAnswers, createAnswer, markAnswerCorrect, deleteAnswer };
