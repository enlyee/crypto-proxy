import { Injectable } from '@nestjs/common';
import { CryptoStrategy } from '../../core/abstract/crypto/strategy.abstract';
import { CryptoEvmStrategy } from './strategy/evm.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly cryptoStrategy: CryptoStrategy;
  constructor(private readonly configService: ConfigService) {
    this.cryptoStrategy = new CryptoEvmStrategy(this.configService); //TODO factory
  }

  async getWalletBalance(walletId: string): Promise<string> {
    return this.cryptoStrategy.getWalletBalanceUSD(walletId);
  }

  async getTransactionValue(
    value: string,
    chain: string,
    contract: string,
  ): Promise<{ name: string; valueUSD: number; valueAmount: number }> {
    return this.cryptoStrategy.getTransactionTokenNameAndValueUSD(
      value,
      chain,
      contract,
    );
  }
}
