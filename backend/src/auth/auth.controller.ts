import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginRequest } from 'src/dtos/loginRequest.dto';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local.authGurad';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Body() request: LoginRequest) {
    return { msg: 'Logged In' };
  }
}
