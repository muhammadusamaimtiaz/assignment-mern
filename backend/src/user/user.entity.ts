import { Invitation } from 'src/invitation/invitation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Invitation, (invitation) => invitation.user)
  invitations: Invitation[];
}
