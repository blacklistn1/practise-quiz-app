import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './services/auth.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cf: ConfigService) => ({
        secret: cf.get('jwt.secret'),
        signOptions: cf.get('jwt.signOptions'),
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
