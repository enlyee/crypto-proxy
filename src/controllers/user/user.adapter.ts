import { UserInput } from './user.input';
import { UserInputDto } from '../../core/dto/user/input/user.input.dto';

export class UserAdapter {
  static transferToDto(input: UserInput): UserInputDto {
    return {
      userId: input.id,
      walletId: input.walletId.toLowerCase(),
    };
  }
}
