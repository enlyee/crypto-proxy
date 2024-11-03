import { Module } from '@nestjs/common';
import { UserWalletConnection } from './entities/userWalletConnection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWalletConnectionRepository } from './reposiroties/userWalletConnection.repository';
import { ContractWhiteListRepository } from './reposiroties/contractWhiteList.repository';
import { ContractWhiteList } from './entities/contractWhiteList';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserWalletConnection, ContractWhiteList]),
  ],
  providers: [UserWalletConnectionRepository, ContractWhiteListRepository],
  exports: [UserWalletConnectionRepository, ContractWhiteListRepository],
})
export class DataSourceModule {}
