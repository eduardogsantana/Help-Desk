import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from 'jsonwebtoken';

// Certifique-se de que o caminho está correto

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<JwtPayload> {
      return this.authService.login(loginDto);
    }
}