import { MatchedReceipt, MatchedTransaction } from './alert.input';
import { CreateNotificationDto } from '../../core/dto/alert/input/create.notification.dto';
import { Web3 } from 'web3';
import { TronWeb } from 'tronweb';

export class AlertAdapter {
  static transferToDto(
    receipt: MatchedReceipt,
    trans: MatchedTransaction,
  ): CreateNotificationDto | CreateNotificationDto[] {
    if (!trans.chainId) {
      return AlertAdapter.transferToTronDto(receipt, trans);
    }
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
        chainId: trans.chainId ?? null,
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

  private static transferToTronDto(
    receipt: MatchedReceipt,
    trans: MatchedTransaction,
  ) {
    trans.hash = trans.hash.slice(2);
    trans.from = AlertAdapter.ethToTron(trans.from);
    trans.to = AlertAdapter.ethToTron(trans.to);
    if (trans.input != '0x') {
      const data = AlertAdapter.transferToTokenDto(receipt, trans);
      return data.map((d) => {
        d.to = AlertAdapter.ethToTron(d.to);
        return {
          hash: trans.hash,
          chainId: null,
          from: d.from,
          to: d.to as string,
          value: d.value as string,
          contract: trans.to,
        };
      });
    }

    return {
      hash: trans.hash,
      chainId: null,
      from: trans.from,
      to: trans.to,
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
  static ethToTron(ethAddress: string) {
    const ethAddressNoPrefix = ethAddress.startsWith('0x')
      ? ethAddress.slice(2)
      : ethAddress;

    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    });

    return tronWeb.address.fromHex('41' + ethAddressNoPrefix);
  }

  static tronToEth(tronAddress: string) {
    const tronAddressWithoutT = tronAddress;

    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    });
    const decoded = tronWeb.address.toHex(tronAddressWithoutT);
    return '0x' + decoded.slice(2);
  }
}

type TokenOutput = {
  to: string;
  from: string;
  value: string;
};
