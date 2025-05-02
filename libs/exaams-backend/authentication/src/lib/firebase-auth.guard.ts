import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as admin from 'firebase-admin';
import { UserService } from './user.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const user = await admin.auth().verifyIdToken(token);

      const dbUser = await this.userService.getUserByEmail(user.email ?? '');

      if (!dbUser) {
        this.userService
          .persistFirebaseUser(user.email ?? '', user['user_id'])
          .then((user) => {
            console.log('😎 User persisted to db:', user.email);
            request.user = user;
          })
          .catch((error) =>
            console.error('Error persisting user to db:', error)
          );
      } else {
        request.user = user;
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authorization = request.headers['authorization'];
    if (!authorization) return null;

    const [scheme, token] = authorization.split(' ');
    return scheme === 'Bearer' ? token : null;
  }
}
