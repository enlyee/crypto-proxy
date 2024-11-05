import { AlertInput, MatchedReceipt, MatchedTransaction } from './alert.input';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { Web3 } from 'web3';

export class AlertAdapter {
  static transferToDto(
    receipt: MatchedReceipt,
    trans: MatchedTransaction,
  ): CreateNotificationDto | CreateNotificationDto[] {
    if (trans.input != '0x') {
      return AlertAdapter.transferToTokenDto(receipt, trans);
    }
    return AlertAdapter.transferToMainDto(receipt, trans);
  }

  private static transferToTokenDto(
    receipt: MatchedReceipt,
    trans: MatchedTransaction,
  ) {
    const data = AlertAdapter.getTransferredTokens(receipt);
    return data.map((d) => {
      return {
        hash: trans.hash,
        chainId: trans.chainId,
        from: (d.from as string).toLowerCase(),
        to: (d.to as string).toLowerCase(),
        value: d.value as string,
        contract: trans.to.toLowerCase(),
      };
    });
  }

  private static transferToMainDto(
    receipt: MatchedReceipt,
    trans: MatchedTransaction,
  ) {
    return {
      hash: trans.hash,
      chainId: trans.chainId,
      from: trans.from.toLowerCase(),
      to: trans.to.toLowerCase(),
      value: trans.value,
      contract: null,
    };
  }

  private static getTransferredTokens(
    transactionReceipt: MatchedReceipt,
  ): TokenOutput[] {
    const web3 = new Web3();
    const transferSignature = web3.utils.sha3(
      'Transfer(address,address,uint256)',
    );
    const arr: TokenOutput[] = [];
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
          arr.push(tokenAmount as unknown as TokenOutput);
        }
      }
    }
    return arr;
  }
}

type TokenOutput = {
  to: string;
  from: string;
  value: string;
};
