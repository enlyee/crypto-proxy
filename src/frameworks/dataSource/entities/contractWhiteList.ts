import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contract_white_list')
export class ContractWhiteList {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'contract_id', nullable: false, type: 'varchar' })
  contractId: string;
}
