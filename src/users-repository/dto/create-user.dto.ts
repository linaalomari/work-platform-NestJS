import { IsEmail, IsString } from '@nestjs/class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  hashedPassword: string;
  @IsString()
  location: string;
  @IsString()
  phoneNumber: string;
}
