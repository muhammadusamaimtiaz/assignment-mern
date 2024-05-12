import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from './invitation.entity';
import { Repository } from 'typeorm';
import { IsAdminDto } from 'src/dtos/isAdminDto.dto';
import { randomBytes } from 'crypto';
import { addHours } from 'date-fns';
import { User } from 'src/user/user.entity';

@Injectable()
export class InvitationService {
  constructor(
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,

    @InjectRepository(User)
    private readonly userRepository: Repository<Invitation>,
  ) {}

  generateSecureToken = (length: number): string => {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  };

  async sendInvite(invitationInfo: IsAdminDto) {
    const { email, adminId } = invitationInfo;
    const token = this.generateSecureToken(32);

    const invitation = await this.invitationRepository.findOne({
      where: { user: { id: adminId } },
    });

    if (invitation) {
      invitation.expirtionDate = addHours(new Date(), 1);
      invitation.invitationCounter = invitation.invitationCounter + 1;

      return await this.invitationRepository.save(invitation);
    } else {
      const admin = await this.userRepository.findOne({
        where: { id: adminId },
      });

      if (!admin) {
        throw new NotFoundException('Admin user not found');
      }
      const invitation = this.invitationRepository.create({
        email,
        expirtionDate: addHours(new Date(), 1),
        token,
        user: admin,
      });

      console.log(`invitation sent to ${email}`);
      return await this.invitationRepository.save(invitation);
    }
  }
}
