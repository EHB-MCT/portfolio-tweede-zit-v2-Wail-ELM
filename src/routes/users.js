const express = require('express');
const { authenticateToken } = require('../middlewares/auth');
const usersController = require('../controllers/usersController');
const router = express.Router();

router.get('/', authenticateToken, usersController.findAll);
router.get('/:id', authenticateToken, usersController.findById);
router.put('/:id', authenticateToken, usersController.update);
router.delete('/:id', authenticateToken, usersController.delete);

module.exports = router;
