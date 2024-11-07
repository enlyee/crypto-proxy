export abstract class CryptoStrategy {
  abstract getWalletBalanceUSD(walletId: string): Promise<string>;
  abstract getTransactionTokenNameAndValueUSD(
    value: string,
    contract?: string,
    chain?: string,
  ): Promise<{ name: string; valueUSD: number; valueAmount: number }>;
}
