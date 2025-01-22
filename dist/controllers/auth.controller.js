"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new user_model_1.User({ email, password });
        await user.save();
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid credentials');
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, JWT_SECRET);
        res.json({ user, token });
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid credentials' });
    }
};
exports.login = login;
