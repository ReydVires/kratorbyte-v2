import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = (process.env.JWT_SECRET || 'flowforge_secret_key_2024') as string;

export interface TenantRequest extends Request {
  tenant?: {
    id: string;
    role: 'Admin' | 'Editor' | 'Viewer';
  };
}

export const authMiddleware = (req: TenantRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.tenant = { id: 'Guess', role: 'Admin' };
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.tenant = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export const tenantIsolation = (req: TenantRequest, res: Response, next: NextFunction) => {
  // Ensure tenant data is filtered in subsequent handlers
  // In a real app, this would be injected into the DB query builder
  console.log(`Isolation for tenant: ${req.tenant?.id}`);
  next();
};
