import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Notification } from '../../core/entity/alert.entity';

@Injectable()
export class SenderService {
  constructor(private readonly httpService: HttpService) {}

  async post(body: Notification, endpoint: string) {
    try {
      const text = `*Client just got a new deposit!:*
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
      /*
      Client just got a new deposit!:
Client address:
0x4b16fc61800da83eeff71e66465cc3c273657da5
Deposit size:
30
Asset:
USDT
Network:
ethereum
Hash:
https://etherscan.io/tx/0xa7999f57408f34f89294f839666cf4bf6391a33c32386119cbe2032dc2dee9ce
Received deposit from:
0xd8d1023d88e70c88e581588cbe12ef5f73a294c2
Asset Contract:
0xdac17f958d2ee523a2206206994597c13d831ec7
Time:
2024-10-30T20:10:01.816Z
Total Balance (USD):
60413.63
       */
      Logger.log(`Sent: ${JSON.stringify(body)}`, 'SenderService');
    } catch (e) {
      console.log(e);
    }
  }
}
