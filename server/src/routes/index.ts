import { Router } from 'express';
import workflowRoutes from './workflow.routes';
import analyticsRoutes from './analytics.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/workflows', workflowRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/auth', authRoutes);

export default router;
