import express, { type Express } from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import botRoutes from './routes/bot';
import tradesRoutes from './routes/trades';
import promptsRoutes from './routes/prompts';
import envRoutes from './routes/env';
import usersRoutes from './routes/users';

export function mount(app: Express) {
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', authRoutes);
  app.use('/api', botRoutes);
  app.use('/api', tradesRoutes);
  app.use('/api', promptsRoutes);
  app.use('/api', envRoutes);
  app.use('/api', usersRoutes);
}
