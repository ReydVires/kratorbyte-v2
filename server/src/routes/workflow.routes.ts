import { Router } from 'express';
import * as workflowController from '../controllers/workflow.controller';

const router = Router();

router.get('/', workflowController.getWorkflows);
router.post('/', workflowController.createWorkflow);
router.get('/templates', workflowController.getTemplates);
router.post('/trigger', workflowController.triggerWorkflow);

export default router;
