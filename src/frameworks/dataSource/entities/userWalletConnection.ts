import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_wallets_connection')
export class UserWalletConnection {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id', nullable: false, type: 'varchar' })
  userId: string;

  @Column({ name: 'wallet_id', nullable: false, type: 'varchar' })
  walletId: string;
}
