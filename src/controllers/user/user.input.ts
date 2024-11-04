import { ApiProperty } from '@nestjs/swagger';

export class UserInput {
  @ApiProperty({ nullable: false })
  id: string;
  @ApiProperty({ nullable: false })
  walletId: string;
}

export class ManyUsersInput {
  @ApiProperty({ nullable: false, type: [UserInput] })
  users: UserInput[];
}
