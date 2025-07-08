const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  smartAssign,
} = require('../controllers/taskController');

const { protect } = require('../middleware/auth');
const { getLogs } = require('../utils/logger');

const router = express.Router();

router.use(protect);
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/smart-assign/:id', smartAssign);
router.get('/logs', getLogs);

module.exports = router;
