import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Initialize the Express application
const app = express();

// Global middlewares
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'StockFlow API is running'
  });
});

// Mount authentication routes
app.use('/api/v1/auth', authRoutes);

// Handle requests to undefined endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Register the global error handler after all routes
app.use(errorHandler);

export default app;
