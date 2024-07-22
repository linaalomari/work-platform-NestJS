import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthenticationGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);
    delete registerDto.password;
    return this.authService.register({ ...registerDto, hashedPassword });
  }

  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
