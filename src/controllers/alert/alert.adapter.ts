import { AlertInput, MatchedReceipt } from './alert.input';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { Web3 } from 'web3';

export class AlertAdapter {
  static transferToDto(entity: AlertInput): CreateNotificationDto {
    const data = AlertAdapter.getTransferredTokens(entity.matchedReceipts[0]);
    return {
      hash: entity.matchedTransactions[0].hash,
      chainId: entity.matchedTransactions[0].chainId,
      from: (data.from as string) ?? entity.matchedTransactions[0].from,
      to: (data.to as string) ?? entity.matchedTransactions[0].to,
      value: (data.value as string) ?? entity.matchedTransactions[0].value,
      contract: entity.matchedReceipts[0].contractAddress.length
        ? entity.matchedReceipts[0].contractAddress
        : null,
    };
  }

  static getTransferredTokens(transactionReceipt: MatchedReceipt) {
    const web3 = new Web3();
    const transferSignature = web3.utils.sha3(
      'Transfer(address,address,uint256)',
    );

    if (transactionReceipt.logs) {
      for (const log of transactionReceipt.logs) {
        if (log.topics[0] === transferSignature) {
          const tokenAmount = web3.eth.abi.decodeLog(
            [
              {
                type: 'address',
                name: 'from',
                indexed: true,
              },
              {
                type: 'address',
                name: 'to',
                indexed: true,
              },
              {
                type: 'uint256',
                name: 'value',
              },
            ],
            log.data,
            log.topics,
          );
          console.log(tokenAmount);
          return tokenAmount;
        }
      }
    }
    return null;
  }
}
