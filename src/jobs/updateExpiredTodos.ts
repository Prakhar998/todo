import cron from 'node-cron';
import { Todo } from '../models/todo.model';

export const startUpdateExpiredTodosJob = () => {
  // Run every day at midnight
  cron.schedule('0 0 * * *', async () => {
    try {
      const now = new Date();
      await Todo.updateMany(
        {
          dueDate: { $lt: now },
          completed: false
        },
        {
          completed: true
        }
      );
      console.log('Updated expired todos successfully');
    } catch (error) {
      console.error('Error updating expired todos:', error);
    }
  });
};
