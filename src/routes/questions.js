const express = require('express');
const questionsController = require('../controllers/questionsController');
const router = express.Router();


router.get('/', questionsController.getQuestions);

router.post('/', questionsController.createQuestion);

module.exports = router;
