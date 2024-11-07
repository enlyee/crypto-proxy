import { Injectable } from '@nestjs/common';
import { UserWalletConnection } from '../entities/userWalletConnection';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserWalletConnectionRepository {
  constructor(
    @InjectRepository(UserWalletConnection)
    private userWalletConnectionRepository: Repository<UserWalletConnection>,
  ) {}

  async getByWalletId(id: string): Promise<UserWalletConnection> {
    return this.userWalletConnectionRepository.findOne({
      where: { walletId: ILike(id) },
    });
  }

  async getAllWallets() {
    return this.userWalletConnectionRepository.find({});
  }

  async save(entity: UserWalletConnection) {
    return this.userWalletConnectionRepository.save(entity);
  }

  async saveMany(entity: UserWalletConnection[]) {
    return this.userWalletConnectionRepository.save(entity);
  }
}
