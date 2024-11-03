import { Module } from '@nestjs/common';
import { AlertController } from './controllers/alert/alert.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AlertUseCaseModule } from './use-cases/alert/alert.use-case.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './frameworks/notification/notification.module';
import { CryptoModule } from './frameworks/crypto/crypto.module';
import { UserModule } from './frameworks/user/user.module';
import { UserController } from './controllers/user/user.controller';
import { UserUseCaseModule } from './use-cases/user/user.use-case.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>
        configService.getOrThrow('db'),
      inject: [ConfigService],
    }),
    AlertUseCaseModule,
    UserUseCaseModule,
    NotificationModule,
    CryptoModule,
    UserModule,
  ],
  controllers: [AlertController, UserController],
})
export class AppModule {}
