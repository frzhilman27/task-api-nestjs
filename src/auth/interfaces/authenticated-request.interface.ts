import { Request } from 'express';

export interface AuthenticatedUser {
  userId: number;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
