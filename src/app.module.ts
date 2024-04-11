import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CallsService } from './calls/calls.service';
import { CallsController } from './calls/calls.controller';
import { HistoricService } from './historic/historic.service';
import { HistoricController,  } from './historic/historic.controller';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';
import { HistoricModule } from './historic/historic.module';
import { CallsModule } from './calls/calls.module';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [PrismaModule,UsersModule, AuthModule, HistoricModule, CallsModule],
  controllers: [AppController, CallsController, HistoricController, UserController],
  providers: [AppService, CallsService, HistoricService, UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Registra o middleware de autenticação globalmente para todas as rotas
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
