import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { UsersRepositoryService } from 'src/users-repository/users-repository.service';
import { CreateUserDto } from '../users-repository/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly jwtService: JwtService,
  ) {}

  register(createUserDto: CreateUserDto) {
    return this.usersRepositoryService.create(createUserDto);
  }

  login() {
    return `This action returns all auth`;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepositoryService.findByEmail(email);
    const hashedPassword = await hash(password, 10);
    if (user && user.hashedPassword === hashedPassword) {
      const { hashedPassword, ...result } = user;
      return user;
    }
    return null;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.usersRepositoryService.findById(payload.id);
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.id}`,
      );
    }

    return user;
  }
}
