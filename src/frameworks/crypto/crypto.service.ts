import { Injectable } from '@nestjs/common';
import { CryptoStrategy } from '../../core/abstract/crypto/strategy.abstract';
import { CryptoEvmStrategy } from './strategy/evm.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  async getWalletBalance(
    walletId: string,
    strategy: CryptoStrategy,
  ): Promise<string> {
    return strategy.getWalletBalanceUSD(walletId);
  }

  async getTransactionValue(
    value: string,
    chain: string,
    contract: string,
    strategy: CryptoStrategy,
  ): Promise<{ name: string; valueUSD: number; valueAmount: number }> {
    return strategy.getTransactionTokenNameAndValueUSD(value, contract, chain);
  }
}
