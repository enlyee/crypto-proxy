import { Injectable } from '@nestjs/common';
import { CryptoStrategy } from '../../../core/abstract/crypto/strategy.abstract';
import Moralis from 'moralis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoEvmStrategy implements CryptoStrategy {
  constructor(private readonly configService: ConfigService) {}

  async getWalletBalanceUSD(walletId: string): Promise<string> {
    try {
      await Moralis.start({
        apiKey: this.configService.getOrThrow<string>('api.moralis'),
      }); //TODO!!!

      const response = await Moralis.EvmApi.wallets.getWalletNetWorth({
        excludeSpam: true,
        excludeUnverifiedContracts: true,
        address: walletId,
      });

      return response.raw.total_networth_usd;
    } catch (e) {
      console.error(e);
    }
  }

  async getTransactionTokenNameAndValueUSD(
    value: string,
    chain: string,
    contract: string,
  ): Promise<{ name: string; valueUSD: number; valueAmount: number }> {
    if (!contract) {
      contract = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'; //TODO!!!!!
    }
    const rate = await this.getTokenPriceAndNameByAddressUSD(contract, chain);
    const valueAmount = parseInt(value) * 10 ** -rate.decimals;
    const valueUSD = valueAmount * rate.price;
    return { name: rate.name, valueUSD: valueUSD, valueAmount: valueAmount };
  }

  private async getTokenPriceAndNameByAddressUSD(
    tokenWallet: string,
    chain: string,
  ): Promise<{ name: string; price: number; decimals: number }> {
    try {
      // await Moralis.start({
      //   apiKey: this.configService.getOrThrow<string>('api.moralis'),
      // });
      console.log(tokenWallet, chain);
      const response = await Moralis.EvmApi.token.getTokenPrice({
        chain: chain,
        include: 'percent_change',
        address: tokenWallet,
      });

      return {
        name: response.raw.tokenName,
        price: response.result.usdPrice,
        decimals: parseInt(response.raw.tokenDecimals),
      };
    } catch (e) {
      console.error(e);
    }
  }
}
