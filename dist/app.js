"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const updateExpiredTodos_1 = require("./jobs/updateExpiredTodos");
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT) || 3000;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    initializeRoutes() {
        // Health check 
        this.app.get('/health', (req, res) => {
            res.status(200).send('Server is running');
        });
        // API routes
        this.app.use('/api/auth', auth_routes_1.default);
        this.app.use('/api/todos', todo_routes_1.default);
    }
    async start() {
        try {
            await (0, database_1.connectDatabase)();
            console.log('Database connected successfully');
            // Start CRON 
            (0, updateExpiredTodos_1.startUpdateExpiredTodosJob)();
            console.log('CRON job initialized');
            // Start server
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        }
        catch (error) {
            console.error('Error starting server:', error);
            process.exit(1);
        }
    }
}
const server = new App();
server.start().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
exports.default = server.app;
