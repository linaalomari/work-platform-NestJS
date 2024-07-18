import { IsEmail, IsString, MinLength } from '@nestjs/class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  email: String;
  @IsString()
  @MinLength(8)
  password: String;
}
