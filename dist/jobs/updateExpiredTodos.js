"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUpdateExpiredTodosJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const todo_model_1 = require("../models/todo.model");
const startUpdateExpiredTodosJob = () => {
    // Run every day at midnight
    node_cron_1.default.schedule('0 0 * * *', async () => {
        try {
            const now = new Date();
            await todo_model_1.Todo.updateMany({
                dueDate: { $lt: now },
                completed: false
            }, {
                completed: true
            });
            console.log('Updated expired todos successfully');
        }
        catch (error) {
            console.error('Error updating expired todos:', error);
        }
    });
};
exports.startUpdateExpiredTodosJob = startUpdateExpiredTodosJob;
