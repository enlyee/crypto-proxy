import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('contract_white_list')
export class ContractWhiteList {
  @PrimaryGeneratedColumn()
  @ApiProperty({ nullable: false })
  id: string;

  @ApiProperty({ nullable: false })
  @Column({ name: 'contract_id', nullable: false, type: 'varchar' })
  contractId: string;
}
