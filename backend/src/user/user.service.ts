import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginRequest } from 'src/dtos/loginRequest.dto';
import { CreateUser } from 'src/dtos/createUser.dto';
import { IsAdminDto } from 'src/dtos/isAdminDto.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async create(createUserrequest: CreateUser) {
    const user = this.userRepository.create(createUserrequest);

    return this.userRepository.save(user);
  }

  async findOneByUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });

    return user;
  }

  async findOneById(invitationInfo: IsAdminDto) {
    const { adminId } = invitationInfo;
    const user = await this.userRepository.findOne({ where: { id: adminId } });

    return user;
  }
}
