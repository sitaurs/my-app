import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.DASHBOARD_JWT_SECRET || 'secret';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send('Unauthorized');
  try {
    jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).send('Unauthorized');
  }
}
