const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const questionsController = require('../controllers/questionsController');
const router = express.Router();

router.get('/', questionsController.getQuestions);
router.post('/', authenticateToken, questionsController.createQuestion);
router.delete('/:id', authenticateToken, questionsController.deleteQuestion);

module.exports = router;
