import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Todo } from '../models/todo.model';

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user?.id,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Error creating todo' });
  }
};

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user?.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
};

export const getTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user?.id });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todo' });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user?.id },
      req.body,
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Error updating todo' });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user?.id });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
};
