import { Injectable } from '@nestjs/common';
import { NotificationFactory } from './notification.factory';
import { Notification } from '../../core/entity/alert.entity';
import { CryptoService } from '../crypto/crypto.service';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationFactory: NotificationFactory,
    private readonly cryptoService: CryptoService,
  ) {}

  async createNotification(
    dto: CreateNotificationDto,
    userId: string,
  ): Promise<Notification> {
    const totalBalance = await this.cryptoService.getWalletBalance(dto.to);
    if (!totalBalance) return null;
    const depositSize = await this.cryptoService.getTransactionValue(
      dto.value,
      dto.chainId,
      dto.contract,
    );
    if (!depositSize) return null;
    const hash = dto.hash;

    return this.notificationFactory.createNotification(
      dto,
      totalBalance,
      depositSize.valueUSD,
      depositSize.valueAmount,
      depositSize.name,
      hash,
      userId,
    );
  }
}
