import { Module } from '@nestjs/common';
import { NotificationModule } from '../../frameworks/notification/notification.module';
import { SenderModule } from '../../frameworks/sender/sender.module';
import { AlertUseCase } from './alert.use-case';
import { DataSourceModule } from '../../frameworks/dataSource/dataSource.module';

@Module({
  imports: [NotificationModule, SenderModule, DataSourceModule],
  providers: [AlertUseCase],
  exports: [AlertUseCase],
})
export class AlertUseCaseModule {}
