import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { InvitationModule } from './invitation/invitation.module';
import { Invitation } from './invitation/invitation.entity';
import { APP_PIPE } from '@nestjs/core';
import { SessionSerializer } from './auth/session.serializer';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'backend',
      entities: [User, Invitation],
      synchronize: true,
      host: 'localhost',
      username: 'postgres',
      password: 'password',
      logger: 'advanced-console',
    }),
    UserModule,
    AuthModule,
    InvitationModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SessionSerializer,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
