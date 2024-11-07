import { Injectable } from '@nestjs/common';
import { CryptoStrategy } from '../../../core/abstract/crypto/strategy.abstract';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CryptoTronStrategy implements CryptoStrategy {
  private readonly TRX_ID = 'TRON';
  private TRON_PRICE: number;

  constructor(private readonly configService: ConfigService) {}
  async getWalletBalanceUSD(walletId: string): Promise<string> {
    try {
      // Получаем баланс аккаунта с Tronscan
      const accountResponse = await axios.get(
        `https://apilist.tronscanapi.com/api/accountv2?address=${walletId}`,
        {
          headers: {
            'TRON-PRO-API-KEY': 'ac1a4038-a965-4289-bbdb-ce6fcb207202', //TODO
          },
        },
      );
      const accountData = accountResponse.data;

      let trxBalance = accountData.balance / 1000000; // Переход от SUN к TRX
      const tokenBalances = accountData.withPriceTokens;

      // Получаем курс TRX к USD
      if (!this.TRON_PRICE) {
        await this.getTronPriceUsd();
      }
      const trxPrice = this.TRON_PRICE;

      // Получаем цену каждого токена и считаем стоимость
      for (const token of tokenBalances) {
        if (token.tokenId == '_') continue;
        trxBalance +=
          Number(token.balance) *
          10 ** -token.tokenDecimal *
          token.tokenPriceInTrx;
      }
      const totalValueInUSD = trxBalance * trxPrice;
      return totalValueInUSD.toString();
    } catch (error) {
      console.error('Error getting account value');
      return null;
    }
  }

  // Функция для получения стоимости монет в долларах по количеству и контракту
  async getTransactionTokenNameAndValueUSD(
    value: string,
    contract: string,
  ): Promise<{ name: string; valueUSD: number; valueAmount: number }> {
    try {
      // Если контракт = null, считаем, что это TRX
      if (!contract) {
        // Получаем цену TRX
        if (!this.TRON_PRICE) {
          await this.getTronPriceUsd();
        }
        const trxPrice = this.TRON_PRICE;

        if (!trxPrice) return null;

        return {
          name: this.TRX_ID,
          valueUSD: trxPrice * Number(value) * 10 ** -6,
          valueAmount: Number(value) * 10 ** -6,
        };
      } else {
        const tokenInfo = await this.getTokenInfo(contract);

        // Получаем цену токена из CoinGecko (или другого источника)
        const tokenPriceResponse = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokenInfo.symbol.toLowerCase()}&vs_currencies=usd`,
        );
        const tokenPrice =
          tokenPriceResponse.data[tokenInfo.symbol.toLowerCase()]?.usd;

        if (!tokenPrice) return null;

        return {
          name: tokenInfo.name,
          valueAmount: Number(value) * 10 ** -tokenInfo.decimals,
          valueUSD: Number(value) * 10 ** -tokenInfo.decimals * tokenPrice,
        };
      }
    } catch (error) {
      console.error('Error getting token value:', error);
      throw new Error('Unable to fetch token value');
    }
  }

  // Получение информации о токене, включая его символ, используя Tronscan API
  private async getTokenInfo(
    contractAddress: string,
  ): Promise<{ symbol: string; name: string; decimals: number }> {
    try {
      const response = await axios.get(
        `https://api.tronscan.org/api/token/${contractAddress}`,
      );
      const tokenData = response.data.data;

      if (!tokenData) return null;

      return {
        symbol: tokenData.symbol,
        name: tokenData.name,
        decimals: tokenData.decimals ?? 6,
      };
    } catch (error) {
      console.error('Error getting token info');
      return null;
    }
  }

  private async getTronPriceUsd() {
    const trxPriceResponse = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=tron&vs_currencies=usd',
    );
    this.TRON_PRICE = trxPriceResponse?.data?.tron?.usd ?? 0;
    return;
  }
}
