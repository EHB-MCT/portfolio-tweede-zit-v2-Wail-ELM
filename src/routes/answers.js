const express = require('express');
const answersController = require('../controllers/answersController');
const router = express.Router();

router.get('/:questionId', answersController.getAnswers);


router.post('/:questionId', answersController.createAnswer);

module.exports = router;
