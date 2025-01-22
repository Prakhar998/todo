"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
const connectDatabase = async () => {
    try {
        const options = {
            autoIndex: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        };
        await mongoose_1.default.connect(MONGODB_URI, options);
        mongoose_1.default.connection.on('connected', () => {
            console.log('Connected to MongoDB successfully');
        });
        mongoose_1.default.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
        // Handle application termination
        process.on('SIGINT', async () => {
            await mongoose_1.default.connection.close();
            console.log('MongoDB connection closed through app termination');
            process.exit(0);
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
const closeDatabase = async () => {
    await mongoose_1.default.connection.close();
};
exports.closeDatabase = closeDatabase;
