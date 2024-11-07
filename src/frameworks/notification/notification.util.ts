import { ChainEnum } from '../crypto/chainConnections';

export class NotificationUtil {
  static getTransactionLinkByChainEnum(chainEnum: ChainEnum): string {
    switch (chainEnum) {
      case ChainEnum.BNB:
        return 'https://bscscan.com/tx/';
      case ChainEnum.ETH:
        return 'https://etherscan.io/tx/';
      case ChainEnum.POL:
        return 'https://polygonscan.com/tx/';
      case ChainEnum.TRX:
        return 'https://tronscan.org/#/transaction/';
      default:
        return null;
    }
  }
}
