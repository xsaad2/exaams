import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from './firebase-auth.guard';
import { UserService } from './user.service.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':email')
  @UseGuards(AuthGuard)
  async getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }
}