export class Notification {
  userId: string;
  toAddress: string;
  fromAddress: string;
  totalBalance: string;
  depositSizeUSD: string;
  depositSizeAmount: string;
  asset: string; //todo enum
  network: string; //todo enum
  hash: string;
  assetContract: string;
  time: string;
}
