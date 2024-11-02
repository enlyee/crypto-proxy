import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CryptoModule } from '../crypto/crypto.module';
import { NotificationFactory } from './notification.factory';

@Module({
  imports: [CryptoModule],
  providers: [NotificationService, NotificationFactory],
  exports: [NotificationService],
})
export class NotificationModule {}
