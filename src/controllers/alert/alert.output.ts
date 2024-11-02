export class AlertPayload {
  toAddress: string;
  fromAddress: string;
  totalBalance: number;
  depositSize: number;
  asset: string; //todo enum
  network: string; //todo enum
  hash: string;
  assetContract: string;
  time: string;
}
