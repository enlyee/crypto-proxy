import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Notification } from '../../core/entity/alert.entity';

@Injectable()
export class SenderService {
  constructor(private readonly httpService: HttpService) {}

  async post(body: Notification, endpoint: string) {
    try {
      const text = `
*Client just got a new deposit!:*
*User ID:*
${body.userId}
*Client address:*
${body.toAddress}
*Deposit size:*
${body.depositSizeAmount}
*Deposit size (USD):*
${body.depositSizeUSD}
*Asset:*
${body.asset}
*Network:*
${body.network}
*Hash:*
https://etherscan.io/tx/${body.hash}
*Received deposit from:*
${body.fromAddress}
*Asset Contract:*
${body.assetContract ?? 'Internal'}
*Time:*
${body.time}
*Total Balance (USD)*
${body.totalBalance}`;
      await this.httpService.post(endpoint, { text: text }).toPromise();
      Logger.log(`Sent: ${JSON.stringify(body)}`, 'SenderService');
    } catch (e) {
      console.log(e);
    }
  }
}
