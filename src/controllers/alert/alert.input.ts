import { ApiProperty } from '@nestjs/swagger';

export class MatchedReceipt {
  @ApiProperty()
  blockHash: string;
  @ApiProperty()
  blockNumber: string;
  @ApiProperty()
  contractAddress: string;
  @ApiProperty()
  cumulativeGasUsed: string;
  @ApiProperty()
  effectiveGasPrice: string;
  @ApiProperty()
  from: string;
  @ApiProperty()
  gasUsed: string;
  @ApiProperty()
  logs: Log[];
  @ApiProperty()
  logsBloom: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  to: string;
  @ApiProperty()
  transactionHash: string;
  @ApiProperty()
  transactionIndex: string;
  @ApiProperty()
  type: string;
}

export class Log {
  address: string;
  blockHash: string;
  blockNumber: string;
  data: string;
  logIndex: string;
  removed: boolean;
  topics: string[];
  transactionHash: string;
  transactionIndex: string;
}

export class MatchedTransaction {
  @ApiProperty()
  accessList: any[];
  @ApiProperty()
  blockHash: string;
  @ApiProperty()
  blockNumber: string;
  @ApiProperty()
  chainId: string;
  @ApiProperty()
  from: string;
  @ApiProperty()
  gas: string;
  @ApiProperty()
  gasPrice: string;
  @ApiProperty()
  hash: string;
  @ApiProperty()
  input: string;
  @ApiProperty()
  maxFeePerGas: string;
  @ApiProperty()
  maxPriorityFeePerGas: string;
  @ApiProperty()
  nonce: string;
  @ApiProperty()
  r: string;
  @ApiProperty()
  s: string;
  @ApiProperty()
  to: string;
  @ApiProperty()
  transactionIndex: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  v: string;
  @ApiProperty()
  value: string;
}

export class AlertInput {
  @ApiProperty({ type: [MatchedReceipt] })
  matchedReceipts: MatchedReceipt[];
  @ApiProperty({ type: [MatchedTransaction] })
  matchedTransactions: MatchedTransaction[];
}
