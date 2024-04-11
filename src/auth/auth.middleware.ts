import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Verifica se o usuário está autenticado
    if (!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    // Se estiver autenticado, permite a continuação da requisição
    next();
  }
}