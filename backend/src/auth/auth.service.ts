import { Injectable } from '@nestjs/common';
import { LoginRequest } from 'src/dtos/loginRequest.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneByUsername(username);

    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }
}
