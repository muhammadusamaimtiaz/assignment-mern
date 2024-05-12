import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class IsAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  adminId: string;
}
