const express = require('express');
const questionsRouter = require('./questions');
const answersRouter = require('./answers');
const usersRouter = require('./users');
const commentsRouter = require('./comments');
const authRouter = require('./auth');
const router = express.Router();

router.use('/questions', questionsRouter);
router.use('/answers', answersRouter);
router.use('/users', usersRouter);
router.use('/comments', commentsRouter);
router.use('/auth', authRouter);

module.exports = router;
