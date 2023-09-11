import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import configVars from '../configs/index.config';

// Extend the Request interface to include custom properties
declare global {
  namespace Express {
    interface Request {
      email?: string;
    }
  }
}

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // get authorization from headers
  const authHeader = req.get('Authorization') ?? req.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const token = authHeader.split(' ')[1];

  jwt.verify(token, configVars.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    // Type assertion: Assuming decoded is JwtPayload
    const jwtPayload = decoded as JwtPayload;

    // Now, TypeScript recognizes jwtPayload as JwtPayload
    req.email = jwtPayload.email;

    next();
  });
}

export default authMiddleware;
