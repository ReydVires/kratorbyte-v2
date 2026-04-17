import { Router } from 'express';
import workflowRoutes from './workflow.routes';
import analyticsRoutes from './analytics.routes';

const router = Router();

router.use('/workflows', workflowRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
