export abstract class CryptoStrategy {
  abstract getWalletBalanceUSD(walletId: string): Promise<string>;
  abstract getTransactionTokenNameAndValueUSD(
    value: string,
    chain: string,
    contract: string,
  ): Promise<{ name: string; valueUSD: number; valueAmount: number }>;
}
