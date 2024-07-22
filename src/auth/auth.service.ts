import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
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

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    if (accessToken) {
      const userData = await this.usersRepositoryService.findByEmail(
        user.email,
      );
      return {
        accessToken,
        userData,
      };
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersRepositoryService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (isPasswordValid) {
      return user;
    }
    return null;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.id,
    };

    return this.jwtService.sign(payload);
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = await this.usersRepositoryService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
