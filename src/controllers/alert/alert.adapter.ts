import { AlertInput, MatchedReceipt } from './alert.input';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { Web3 } from 'web3';

export class AlertAdapter {
  static transferToDto(entity: AlertInput): CreateNotificationDto {
    if (entity.matchedReceipts[0].contractAddress.length) {
      return AlertAdapter.transferToTokenDto(entity);
    }
    return AlertAdapter.transferToMainDto(entity);
  }

  private static transferToTokenDto(entity: AlertInput) {
    const data = AlertAdapter.getTransferredTokens(entity.matchedReceipts[0]);
    return {
      hash: entity.matchedTransactions[0].hash,
      chainId: entity.matchedTransactions[0].chainId,
      from: data.from as string,
      to: data.to as string,
      value: data.value as string,
      contract: entity.matchedReceipts[0].contractAddress,
    };
  }

  private static transferToMainDto(entity: AlertInput) {
    return {
      hash: entity.matchedTransactions[0].hash,
      chainId: entity.matchedTransactions[0].chainId,
      from: entity.matchedTransactions[0].from,
      to: entity.matchedTransactions[0].to,
      value: entity.matchedTransactions[0].value,
      contract: null,
    };
  }

  private static getTransferredTokens(transactionReceipt: MatchedReceipt) {
    const web3 = new Web3();
    const transferSignature = web3.utils.sha3(
      'Transfer(address,address,uint256)',
    );

    if (transactionReceipt?.logs) {
      for (const log of transactionReceipt.logs) {
        if (log?.topics[0] === transferSignature) {
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
