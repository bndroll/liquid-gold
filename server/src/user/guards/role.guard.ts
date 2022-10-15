import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    let requiredRoles: string[] = this.reflector.getAllAndOverride<string[]>('role', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const [_, token]: [string, string] = authHeader.split(' ');

    const userJwt = this.jwtService.verify(token, this.configService.get('JWT_SECRET'));
    const user = this.userService.findById(userJwt.id);

    return user.then(u => !!requiredRoles.find(role => {
      console.log('requiredRoles = ', requiredRoles);
      console.log('user = ', user);
      return role === u.role;
    }));
  }
}