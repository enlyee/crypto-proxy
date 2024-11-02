import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoEvmStrategy } from './strategy/evm.strategy';

@Module({
  providers: [CryptoService, CryptoEvmStrategy],
  exports: [CryptoService, CryptoEvmStrategy],
})
export class CryptoModule {}
