const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const commentsController = require('../controllers/commentsController');
const router = express.Router();

router.get('/:answerId', commentsController.getComments);
router.post('/:answerId', authenticateToken, commentsController.createComment);
router.delete('/:id', authenticateToken, commentsController.deleteComment);

module.exports = router;
