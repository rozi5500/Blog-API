import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../../../common/enums';
import { ROLES_KEY } from '../../../common/decorators';
import { JwtService } from '@nestjs/jwt';

export type userType = {
  email: string;
  sub: string;
  role: RolesEnum;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    let token = context.switchToHttp().getRequest()?.headers?.authorization;
    if (!token) throw new UnauthorizedException('Invalid token');

    token = token.replace('Bearer', '').trim();
    const user = this.jwtService.decode(token) as userType;

    return requiredRoles.includes(user.role);
  }
}
