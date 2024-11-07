import { Injectable } from '@nestjs/common';
import { NotificationFactory } from './notification.factory';
import { Notification } from '../../core/entity/alert.entity';
import { CryptoService } from '../crypto/crypto.service';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { CryptoEvmStrategy } from '../crypto/strategy/evm.strategy';
import { ConfigService } from '@nestjs/config';
import { CryptoTronStrategy } from '../crypto/strategy/tron.strategy';
import { ChainEnum, ChainName } from '../crypto/chainConnections';

@Injectable()
export class NotificationService {
  private chain: ChainEnum;
  constructor(
    private readonly notificationFactory: NotificationFactory,
    private readonly cryptoService: CryptoService,
    private readonly configService: ConfigService,
  ) {}

  async createNotification(
    dto: CreateNotificationDto,
    userId: string,
  ): Promise<Notification> {
    const str = this.strategyBuilder(dto.chainId);
    const totalBalance = await this.cryptoService.getWalletBalance(dto.to, str);
    if (!totalBalance) return null;
    const depositSize = await this.cryptoService.getTransactionValue(
      dto.value,
      dto.chainId,
      dto.contract,
      str,
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
      this.chain,
    );
  }

  private strategyBuilder(chainId: string) {
    this.setChain(chainId);
    if (chainId) {
      return new CryptoEvmStrategy(this.configService);
    }
    return new CryptoTronStrategy(this.configService);
  }

  private setChain(chainId: string) {
    if (!chainId) this.chain = ChainEnum.TRX;
    this.chain = ChainName[chainId];
  }
}
