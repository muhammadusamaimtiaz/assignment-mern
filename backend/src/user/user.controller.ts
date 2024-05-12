import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser } from 'src/dtos/createUser.dto';
import { InvitationService } from 'src/invitation/invitation.service';
import { IsAdminDto } from 'src/dtos/isAdminDto.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly invitationService: InvitationService,
  ) {}

  @Get()
  async getAllUsers() {
    return this.userService.getAll();
  }

  @Post('/create')
  async createSecureServer(@Body() createUserrequest: CreateUser) {
    return this.userService.create(createUserrequest);
  }

  @UseGuards(AdminGuard)
  @Post('/send-invite')
  async sendInvitation(@Body() invitationInfo: IsAdminDto) {
    const invitation = await this.invitationService.sendInvite(invitationInfo);
    // const { token, ...invitationWithOutToken } = invitation;
    return invitation;
  }
}
