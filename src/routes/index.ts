import { Express } from 'express';
import authRoutes from "./authRoutes";

export const registerRoutes = (app: Express) => {
    app.use('/api/auth', authRoutes);
    app.use('api/users', )
};