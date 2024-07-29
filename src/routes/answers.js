const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const answersController = require('../controllers/answersController');
const router = express.Router();

router.get('/:questionId', answersController.getAnswers);
router.post('/:questionId', authenticateToken, answersController.createAnswer);
router.put('/:id/correct', authenticateToken, answersController.markAnswerCorrect);
router.delete('/:id', authenticateToken, answersController.deleteAnswer);

module.exports = router;
