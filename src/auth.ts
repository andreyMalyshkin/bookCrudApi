import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Roles } from './roles';
import logger from './logger';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (ex) {
    logger.error(`Error: ${ex}, incoming token: ${token}`)
    res.status(400).send('Invalid token.');
  }
};

export const authorize = (role: keyof typeof Roles) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).user.role;
    if (!Roles[role]) return res.status(403).send('Access denied.');
    if ((userRole & Roles[role]) !== Roles[role]) return res.status(403).send('Access denied.');
    next();
  };
};