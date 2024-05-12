import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateUser {
  @IsString()
  name: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
}
