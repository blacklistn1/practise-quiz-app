import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import mainConfig from './project/config/main.config';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mainConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cf: ConfigService) => ({
        type: 'mysql',
        host: cf.get('database.host'),
        port: cf.get('database.port'),
        username: cf.get('database.username'),
        password: cf.get('database.password'),
        database: cf.get('database.database'),
        synchronize: cf.get('database.synchronize'),
        entities: cf.get('database.entities'),
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
