import { Injectable } from '@nestjs/common';
import { UserWalletConnection } from '../entities/userWalletConnection';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractWhiteList } from '../entities/contractWhiteList';

@Injectable()
export class ContractWhiteListRepository {
  constructor(
    @InjectRepository(ContractWhiteList)
    private contractWhiteListRepository: Repository<ContractWhiteList>,
  ) {}

  async getByContractId(id: string): Promise<ContractWhiteList> {
    return this.contractWhiteListRepository.findOne({
      where: { contractId: id },
    });
  }
}
