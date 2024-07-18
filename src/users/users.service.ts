import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../users-repository/dto/update-user.dto';
import { CreateUserDto } from 'src/users-repository/dto/create-user.dto';
import { UsersRepositoryService } from 'src/users-repository/users-repository.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepositoryService.create(createUserDto);
  }

  findAll() {
    return this.usersRepositoryService.findAll();
  }

  getByEmail(email: string) {
    return this.usersRepositoryService.findByEmail(email);
  }

  getById(id: number) {
    return this.usersRepositoryService.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepositoryService.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepositoryService.remove(id);
  }
}
