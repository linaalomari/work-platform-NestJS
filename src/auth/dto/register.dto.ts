import { IsString, MinLength } from '@nestjs/class-validator';
import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users-repository/dto/create-user.dto';

export class RegisterDto extends OmitType(CreateUserDto, ['hashedPassword']) {
  @IsString()
  @MinLength(8)
  password: string;
}
