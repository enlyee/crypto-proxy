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
            'TRON-PRO-API-KEY': this.configService.getOrThrow('api.tronscan'), //TODO
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
      for (const token of tokenBalances) {
        if (token.tokenId == '_') continue;
        trxBalance +=
          Number(token.balance) *
          10 ** -token.tokenDecimal *
          token.tokenPriceInTrx;
      }
      const totalValueInUSD = trxBalance * trxPrice;
      return totalValueInUSD.toString();
    } catch (e) {
      console.error('Error getting account value', e);
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
          `https://apilist.tronscanapi.com/api/token/price?token=${tokenInfo.symbol.toLowerCase()}`,
          {
            headers: {
              'TRON-PRO-API-KEY': this.configService.getOrThrow('api.tronscan'), //TODO
            },
          },
        );
        const tokenPrice = tokenPriceResponse.data.price_in_usd;

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
        `https://apilist.tronscanapi.com/api/contract?contract=${contractAddress}`,
        {
          headers: {
            'TRON-PRO-API-KEY': this.configService.getOrThrow('api.tronscan'), //TODO
          },
        },
      );

      const tokenData = response.data.data[0];

      if (!tokenData) return null;

      return {
        symbol: tokenData.tokenInfo.tokenAbbr,
        name: tokenData.tokenInfo.tokenName,
        decimals: tokenData.tokenInfo.tokenDecimal ?? 6,
      };
    } catch (error) {
      console.error('Error getting token info');
      return null;
    }
  }

  private async getTronPriceUsd() {
    const tokenPriceResponse = await axios.get(
      `https://apilist.tronscanapi.com/api/token/price?token=trx`,
      {
        headers: {
          'TRON-PRO-API-KEY': this.configService.getOrThrow('api.tronscan'),
        },
      },
    );
    const tokenPrice = tokenPriceResponse.data.price_in_usd;
    this.TRON_PRICE = tokenPrice ?? 0;
    return;
  }
}
