import express from 'express';
import { auth } from '../middleware/auth.middleware';
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todo.controller';

const router = express.Router();

router.use(auth);

router.post('/', createTodo);
router.get('/', getTodos);
router.get('/:id', getTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

export default router;