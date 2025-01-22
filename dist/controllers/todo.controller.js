"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodo = void 0;
const todo_model_1 = require("../models/todo.model");
const createTodo = async (req, res) => {
    var _a;
    try {
        const todo = new todo_model_1.Todo({
            ...req.body,
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
        });
        await todo.save();
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating todo' });
    }
};
exports.createTodo = createTodo;
const getTodos = async (req, res) => {
    var _a;
    try {
        const todos = await todo_model_1.Todo.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching todos' });
    }
};
exports.getTodos = getTodos;
const getTodo = async (req, res) => {
    var _a;
    try {
        const todo = await todo_model_1.Todo.findOne({ _id: req.params.id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching todo' });
    }
};
exports.getTodo = getTodo;
const updateTodo = async (req, res) => {
    var _a;
    try {
        const todo = await todo_model_1.Todo.findOneAndUpdate({ _id: req.params.id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id }, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(400).json({ error: 'Error updating todo' });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    var _a;
    try {
        const todo = await todo_model_1.Todo.findOneAndDelete({ _id: req.params.id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting todo' });
    }
};
exports.deleteTodo = deleteTodo;
