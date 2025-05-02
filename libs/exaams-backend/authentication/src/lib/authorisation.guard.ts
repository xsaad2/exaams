import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly allowedEmail: string) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user?.email !== this.allowedEmail) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
