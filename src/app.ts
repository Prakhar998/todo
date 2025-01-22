import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDatabase } from './config/database';
import authRoutes from './routes/auth.routes';
import todoRoutes from './routes/todo.routes';
import { startUpdateExpiredTodosJob } from './jobs/updateExpiredTodos';

dotenv.config();

class App {
    public app: Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes() {
        // Health check 
        this.app.get('/health', (req: Request, res: Response) => {
            res.status(200).send('Server is running');
        });

        // API routes
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/todos', todoRoutes);
    }

    public async start() {
        try {
            
            await connectDatabase();
            console.log('Database connected successfully');

            // Start CRON 
            startUpdateExpiredTodosJob();
            console.log('CRON job initialized');

            // Start server
            this.app.listen(this.port, () => {
                console.log(`Server is running on port ${this.port}`);
            });
        } catch (error) {
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

export default server.app;