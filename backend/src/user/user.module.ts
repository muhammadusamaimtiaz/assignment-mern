import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitationService } from 'src/invitation/invitation.service';
import { Invitation } from 'src/invitation/invitation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Invitation])],
  controllers: [UserController],
  providers: [UserService, InvitationService],
})
export class UserModule {}
