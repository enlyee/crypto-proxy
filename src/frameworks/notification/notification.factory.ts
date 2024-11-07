import { Injectable } from '@nestjs/common';
import { Notification } from '../../core/entity/alert.entity';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { ChainEnum } from '../crypto/chainConnections';

@Injectable()
export class NotificationFactory {
  constructor() {}

  createNotification(
    dto: CreateNotificationDto,
    totalBalance: string,
    depositSizeUSD: number,
    depositSizeAmount: number,
    chainName: string,
    hash: string,
    userId: string,
    network: ChainEnum,
  ): Notification {
    return {
      userId: userId,
      toAddress: dto.to,
      fromAddress: dto.from,
      totalBalance: parseFloat(totalBalance).toFixed(2),
      depositSizeUSD: twoDecimal(depositSizeUSD),
      depositSizeAmount: depositSizeAmount.toString(),
      asset: chainName,
      network: network,
      hash: hash,
      assetContract: dto.contract,
      time: new Date().toISOString(),
    };
  }
}

const twoDecimal = (a) =>
  (a.toString().match(/e/)
    ? Number(a.toString().match(/[^e]*/)[0])
    : a
  ).toFixed(2);
