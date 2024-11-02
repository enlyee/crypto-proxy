import { Module } from '@nestjs/common';
import { UserWalletConnection } from './entities/userWalletConnection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWalletConnectionRepository } from './reposiroties/userWalletConnection.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserWalletConnection])],
  providers: [UserWalletConnectionRepository],
  exports: [UserWalletConnectionRepository],
})
export class DataSourceModule {}
