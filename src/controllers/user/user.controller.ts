import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { ManyUsersInput, UserInput } from './user.input';
import { UserWalletConnection } from '../../frameworks/dataSource/entities/userWalletConnection';
import { UserUseCase } from '../../use-cases/user/user.use-case';
import { UserAdapter } from './user.adapter';

@Controller('user')
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @ApiResponse({ type: UserWalletConnection })
  @ApiOperation({ summary: 'Create One User' })
  @Post('create')
  async createUser(@Body() input: UserInput): Promise<UserWalletConnection> {
    return this.userUseCase.createUser(UserAdapter.transferToDto(input));
  }
  @ApiResponse({ type: ManyUsersInput })
  @ApiOperation({ summary: 'Create many Users' })
  @Post('createmany')
  async createManyUsers(
    @Body() input: ManyUsersInput,
  ): Promise<UserWalletConnection[]> {
    return this.userUseCase.createManyUsers(
      input.users.map(UserAdapter.transferToDto),
    );
  }
}
