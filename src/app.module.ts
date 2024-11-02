import { Module } from '@nestjs/common';
import { AlertController } from './controllers/alert/alert.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { AlertUseCaseModule } from './use-cases/alert/alert.use-case.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './frameworks/notification/notification.module';
import { CryptoModule } from './frameworks/crypto/crypto.module';

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
    NotificationModule,
    CryptoModule,
  ],
  controllers: [AlertController],
})
export class AppModule {}
