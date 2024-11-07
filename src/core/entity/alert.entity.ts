import { ApiProperty } from '@nestjs/swagger';
import { ChainEnum } from '../../frameworks/crypto/chainConnections';

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
  asset: string;
  @ApiProperty({ nullable: false })
  network: ChainEnum;
  @ApiProperty({ nullable: false })
  hash: string;
  @ApiProperty({ nullable: false })
  assetContract: string;
  @ApiProperty({ nullable: false })
  time: string;
}
