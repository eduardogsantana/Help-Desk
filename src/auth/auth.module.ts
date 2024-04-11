import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    AuthModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || '123456789',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy, AuthService, PrismaService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
