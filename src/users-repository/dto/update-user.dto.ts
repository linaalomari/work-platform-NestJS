import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from 'src/users-repository/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
