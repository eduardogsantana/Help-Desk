import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decoratos';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    
    // Permitir acesso se não houver funções especificadas
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Verificar se o usuário está autenticado
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    // Verificar se o usuário tem pelo menos um dos papéis necessários
    const hasRole = requiredRoles.some(role => user.role === role);
    if (!hasRole) {
      throw new UnauthorizedException('User does not have the required role');
    }

    // Permitir a execução se o usuário estiver autenticado e tiver o papel necessário
    return true;
  }
}