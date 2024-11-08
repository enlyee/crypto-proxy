import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '../../frameworks/notification/notification.service';
import { SenderService } from '../../frameworks/sender/sender.service';
import { Notification } from '../../core/entity/alert.entity';
import { ConfigService } from '@nestjs/config';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { UserWalletConnectionRepository } from '../../frameworks/dataSource/reposiroties/userWalletConnection.repository';
import { ContractWhiteListRepository } from '../../frameworks/dataSource/reposiroties/contractWhiteList.repository';
import { SenderUtil } from '../../frameworks/sender/sender.util';
import {
  ExpressionsPayload,
  GetNotificationsPayload,
} from '../../controllers/alert/alert.payload';
import { AlertAdapter } from '../../controllers/alert/alert.adapter';

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
    const valueNum = Number(dto.value);
    if (Number.isNaN(valueNum) || valueNum == 0) return null;
    Logger.log('Started!', 'sendNotification');
    const userWallet = await this.userWalletRepository.getByWalletId(dto.to);
    if (!userWallet) {
      Logger.warn(`User doesnt exists! ${dto.to}`, 'sendNotification');
      return null;
    }
    if (dto.contract) {
      const contracts = await this.contractWhiteListRepository.getByContractId(
        dto.contract,
      );
      if (!contracts) {
        Logger.warn(
          `Contract no in whitelist! ${dto.contract}`,
          'sendNotification',
        );
        return null;
      }
    }

    const notification: Notification =
      await this.notificationService.createNotification(dto, userWallet.userId);
    if (!notification) {
      Logger.warn('Notification wrong!', 'sendNotification');
      return;
    }
    const endpoint = this.configService.getOrThrow<string>('endpoint');

    let sendBody: object;
    const outputType = this.configService.get<string>('destinationType');
    switch (outputType.toLowerCase()) {
      case 'slack': {
        sendBody = SenderUtil.transferToSlack(notification);
        break;
      }
      default:
        sendBody = notification;
    }

    await this.senderService.post(sendBody, endpoint);
    Logger.log('Sent!', 'sendNotification');
    return notification;
  }

  async syncUsersWithNode(): Promise<ExpressionsPayload> {
    const allWallets = await this.userWalletRepository.getAllWallets();

    const txWallets = [];
    const logsWallets = [];
    allWallets.map((w) => {
      let wallet: string;

      if (!w.walletId.startsWith('0x')) {
        wallet = AlertAdapter.tronToEth(w.walletId).toLowerCase();
      } else {
        wallet = w.walletId.toLowerCase();
      }

      const paddedAddress =
        '0x' + '0'.repeat(66 - wallet.length) + wallet.slice(2);
      logsWallets.push(`'` + paddedAddress + `'`);
      txWallets.push(`'` + wallet + `'`);
    });

    const txWalletsString = 'tx_to in (' + txWallets.join(', ') + ')';
    const logsWalletsString =
      'tx_logs_topic2 in (' + logsWallets.join(', ') + ')';

    return { internal: txWalletsString, token: logsWalletsString };
  }
}
