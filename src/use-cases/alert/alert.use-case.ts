import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '../../frameworks/notification/notification.service';
import { SenderService } from '../../frameworks/sender/sender.service';
import { Notification } from '../../core/entity/alert.entity';
import { ConfigService } from '@nestjs/config';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { UserWalletConnectionRepository } from '../../frameworks/dataSource/reposiroties/userWalletConnection.repository';
import { ContractWhiteListRepository } from '../../frameworks/dataSource/reposiroties/contractWhiteList.repository';

@Injectable()
export class AlertUseCase {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly configService: ConfigService,
    private readonly senderService: SenderService,
    private readonly userWalletRepository: UserWalletConnectionRepository,
    private readonly contractWhiteListRepository: ContractWhiteListRepository,
  ) {}

  async sendNotification(dto: CreateNotificationDto): Promise<Notification> {
    Logger.log('Started!', 'sendNotification');
    const userWallet = await this.userWalletRepository.getByWalletId(dto.to);
    if (!userWallet) {
      Logger.warn(`User doesnt exists! ${dto.from}`, 'sendNotification');
      return null;
    }
    // if (dto.contract) {
    //   const contracts = await this.contractWhiteListRepository.getByContractId(
    //     dto.contract,
    //   );
    //   if (!contracts) {
    //     Logger.warn(
    //       `Contract no in whitelist! ${dto.contract}`,
    //       'sendNotification',
    //     );
    //     return null;
    //   }
    // }
    const notification: Notification =
      await this.notificationService.createNotification(dto, userWallet.userId);
    if (!notification) {
      Logger.warn('Notification wrong!', 'sendNotification');
      return;
    }
    const endpoint = this.configService.getOrThrow<string>('endpoint');
    await this.senderService.post(notification, endpoint);
    Logger.log('Sent!', 'sendNotification');
    return notification;
  }
}
