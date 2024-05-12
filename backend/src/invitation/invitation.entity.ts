import { IsEmail } from 'class-validator';
import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  expirtionDate: Date;

  @Column({ default: 0 })
  invitationCounter: number;

  @ManyToOne(() => User, (user) => user.invitations)
  user: User;
}
