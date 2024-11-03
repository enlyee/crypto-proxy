import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_wallets_connection')
export class UserWalletConnection {
  @PrimaryGeneratedColumn()
  @ApiProperty({ nullable: false })
  id: string;

  @ApiProperty({ nullable: false })
  @Column({ name: 'user_id', nullable: false, type: 'varchar' })
  userId: string;

  @ApiProperty({ nullable: false })
  @Column({ name: 'wallet_id', nullable: false, type: 'varchar' })
  walletId: string;
}
