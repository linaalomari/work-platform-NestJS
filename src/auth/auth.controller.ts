import { Body, Controller, Post } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from '../users-repository/dto/create-user.dto';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const hashedPassword = await hash(registerDto.password, 10);
    delete registerDto.password;
    return this.authService.register({ ...registerDto, hashedPassword });
  }

  @Post('login')
  login(@Body() createAuthDto: CreateUserDto) {
    return this.authService.register(createAuthDto);
  }
}
