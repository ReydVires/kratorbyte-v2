import { Router } from 'express';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.get('/', analyticsController.getDashboardMetrics);
router.get('/stream', analyticsController.streamMetrics);

export default router;
