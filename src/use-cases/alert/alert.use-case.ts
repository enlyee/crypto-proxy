import { Injectable } from '@nestjs/common';
import { NotificationService } from '../../frameworks/notification/notification.service';
import { SenderService } from '../../frameworks/sender/sender.service';
import { Notification } from '../../core/entity/alert.entity';
import { ConfigService } from '@nestjs/config';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { UserWalletConnectionRepository } from '../../frameworks/dataSource/reposiroties/userWalletConnection.repository';

@Injectable()
export class AlertUseCase {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly configService: ConfigService,
    private readonly senderService: SenderService,
    private readonly userWalletRepository: UserWalletConnectionRepository,
  ) {}

  async sendNotification(dto: CreateNotificationDto): Promise<void> {
    const userWallet = await this.userWalletRepository.getByWalletId(dto.to);
    if (!userWallet) return null;
    const notification: Notification =
      await this.notificationService.createNotification(dto, userWallet.userId);
    if (!notification) return;
    const endpoint = this.configService.getOrThrow<string>('endpoint');
    await this.senderService.post(notification, endpoint);
    return;
  }
}
