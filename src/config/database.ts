import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';

export const connectDatabase = async (): Promise<void> => {
  try {
    const options = {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s of trying to connect
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    await mongoose.connect(MONGODB_URI, options);
    
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
};