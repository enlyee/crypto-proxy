import { Module } from '@nestjs/common';
import { SenderService } from '../sender/sender.service';
import { NotificationFactory } from './notification.factory';
import { NotificationService } from './notification.service';

@Module({
  providers: [SenderService, NotificationFactory],
  exports: [NotificationService],
})
export class NotificationModule {}
