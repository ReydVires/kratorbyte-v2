import { Router, Response } from 'express';
import { TenantRequest } from '../middleware/auth';

const router = Router();

router.get('/me', (req: TenantRequest, res: Response) => {
  res.json({
    tenant: req.tenant?.id || 'Unknown',
    role: req.tenant?.role || 'Viewer'
  });
});

export default router;
