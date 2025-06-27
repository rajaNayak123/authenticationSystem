import jwt from 'jsonwebtoken';
import { config } from '../config';
import { TokenPayload } from '../types';

export class JwtUtil {
  static generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
  }

  static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, config.jwt.secret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static extractTokenFromHeader(authHeader?: string): string {
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid authorization header format');
    }

    const token = authHeader.substring(7);
    if (!token) {
      throw new Error('Token missing from authorization header');
    }

    return token;
  }
}