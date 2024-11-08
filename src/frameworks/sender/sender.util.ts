import { Notification } from '../../core/entity/alert.entity';
import { NotificationUtil } from '../notification/notification.util';

export class SenderUtil {
  static transferToSlack(body: Notification) {
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
${body.hash}
*Received deposit from:*
${body.fromAddress}
*Asset Contract:*
${body.assetContract ?? 'Internal'}
*Time:*
${body.time}
*Total Balance (USD)*
${body.totalBalance}`;
    return { text: text };
  }
}
