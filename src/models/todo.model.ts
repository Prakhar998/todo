import mongoose, { Schema, Document } from 'mongoose';

export interface ITodoDocument extends ITodo, Document {}

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Todo = mongoose.model<ITodoDocument>('Todo', todoSchema);