import { ApiProperty } from '@nestjs/swagger';

export class Notification {
  @ApiProperty({ nullable: false })
  userId: string;
  @ApiProperty({ nullable: false })
  toAddress: string;
  @ApiProperty({ nullable: false })
  fromAddress: string;
  @ApiProperty({ nullable: false })
  totalBalance: string;
  @ApiProperty({ nullable: false })
  depositSizeUSD: string;
  @ApiProperty({ nullable: false })
  depositSizeAmount: string;
  @ApiProperty({ nullable: false })
  asset: string; //todo enum
  @ApiProperty({ nullable: false })
  network: string; //todo enum
  @ApiProperty({ nullable: false })
  hash: string;
  @ApiProperty({ nullable: false })
  assetContract: string;
  @ApiProperty({ nullable: false })
  time: string;
}
