import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
const jwt = new JwtService();
@Injectable()
export class CheckTokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.headers;
      if (!token) {
        return next(new ForbiddenException('token required'));
      }

      const result = jwt.verify(token as string, {
        secret: 'mahfiy',
      });
      next();
    } catch (error) {
      return next(new ForbiddenException('invalid token'));
    }
  }
}
