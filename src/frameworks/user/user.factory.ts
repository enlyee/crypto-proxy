import { Injectable } from '@nestjs/common';
import { UserInputDto } from '../../core/dto/user/input/user.input.dto';
import { UserWalletConnection } from '../dataSource/entities/userWalletConnection';

@Injectable()
export class UserFactory {
  create(dto: UserInputDto) {
    const user = new UserWalletConnection();
    user.userId = dto.userId;
    user.walletId = dto.walletId;
    return user;
  }
}
