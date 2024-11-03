import { Injectable } from '@nestjs/common';
import { UserInputDto } from '../../core/dto/user/input/user.input.dto';
import { UserWalletConnection } from '../../frameworks/dataSource/entities/userWalletConnection';
import { UserWalletConnectionRepository } from '../../frameworks/dataSource/reposiroties/userWalletConnection.repository';
import { UserFactory } from '../../frameworks/user/user.factory';

@Injectable()
export class UserUseCase {
  constructor(
    private readonly userWalletRepository: UserWalletConnectionRepository,
    private readonly userFactory: UserFactory,
  ) {}

  async createUser(user: UserInputDto): Promise<UserWalletConnection> {
    return this.userWalletRepository.save(this.userFactory.create(user));
  }

  async createManyUsers(
    users: UserInputDto[],
  ): Promise<UserWalletConnection[]> {
    return this.userWalletRepository.saveMany(
      users.map((u) => this.userFactory.create(u)),
    );
  }
}
