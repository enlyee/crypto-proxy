import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type GetAccountInfoByAddressMetadataParam = FromSchema<typeof schemas.GetAccountInfoByAddress.metadata>;
export type GetAccountInfoByAddressResponse200 = FromSchema<typeof schemas.GetAccountInfoByAddress.response['200']>;
export type GetAccountInfoByAddressResponse400 = FromSchema<typeof schemas.GetAccountInfoByAddress.response['400']>;
export type GetAssetByIdOrIssuerMetadataParam = FromSchema<typeof schemas.GetAssetByIdOrIssuer.metadata>;
export type GetAssetByIdOrIssuerResponse200 = FromSchema<typeof schemas.GetAssetByIdOrIssuer.response['200']>;
export type GetAssetByIdOrIssuerResponse400 = FromSchema<typeof schemas.GetAssetByIdOrIssuer.response['400']>;
export type GetAssetByNameMetadataParam = FromSchema<typeof schemas.GetAssetByName.metadata>;
export type GetAssetByNameResponse200 = FromSchema<typeof schemas.GetAssetByName.response['200']>;
export type GetAssetByNameResponse400 = FromSchema<typeof schemas.GetAssetByName.response['400']>;
export type GetEventsByBlockNumberMetadataParam = FromSchema<typeof schemas.GetEventsByBlockNumber.metadata>;
export type GetEventsByBlockNumberResponse200 = FromSchema<typeof schemas.GetEventsByBlockNumber.response['200']>;
export type GetEventsByBlockNumberResponse400 = FromSchema<typeof schemas.GetEventsByBlockNumber.response['400']>;
export type GetEventsByContractAddressMetadataParam = FromSchema<typeof schemas.GetEventsByContractAddress.metadata>;
export type GetEventsByContractAddressResponse200 = FromSchema<typeof schemas.GetEventsByContractAddress.response['200']>;
export type GetEventsByContractAddressResponse400 = FromSchema<typeof schemas.GetEventsByContractAddress.response['400']>;
export type GetEventsByLatestBlockMetadataParam = FromSchema<typeof schemas.GetEventsByLatestBlock.metadata>;
export type GetEventsByLatestBlockResponse200 = FromSchema<typeof schemas.GetEventsByLatestBlock.response['200']>;
export type GetEventsByLatestBlockResponse400 = FromSchema<typeof schemas.GetEventsByLatestBlock.response['400']>;
export type GetEventsByTransactionIdMetadataParam = FromSchema<typeof schemas.GetEventsByTransactionId.metadata>;
export type GetEventsByTransactionIdResponse200 = FromSchema<typeof schemas.GetEventsByTransactionId.response['200']>;
export type GetEventsByTransactionIdResponse400 = FromSchema<typeof schemas.GetEventsByTransactionId.response['400']>;
export type GetTransactionInfoByAccountAddressMetadataParam = FromSchema<typeof schemas.GetTransactionInfoByAccountAddress.metadata>;
export type GetTransactionInfoByAccountAddressResponse200 = FromSchema<typeof schemas.GetTransactionInfoByAccountAddress.response['200']>;
export type GetTransactionInfoByAccountAddressResponse400 = FromSchema<typeof schemas.GetTransactionInfoByAccountAddress.response['400']>;
export type GetTransactionInfoByContractAddressMetadataParam = FromSchema<typeof schemas.GetTransactionInfoByContractAddress.metadata>;
export type GetTransactionInfoByContractAddressResponse200 = FromSchema<typeof schemas.GetTransactionInfoByContractAddress.response['200']>;
export type GetTransactionInfoByContractAddressResponse400 = FromSchema<typeof schemas.GetTransactionInfoByContractAddress.response['400']>;
export type GetTrc20TokenHolderBalancesMetadataParam = FromSchema<typeof schemas.GetTrc20TokenHolderBalances.metadata>;
export type GetTrc20TokenHolderBalancesResponse200 = FromSchema<typeof schemas.GetTrc20TokenHolderBalances.response['200']>;
export type GetTrc20TokenHolderBalancesResponse400 = FromSchema<typeof schemas.GetTrc20TokenHolderBalances.response['400']>;
export type GetTrc20TransactionInfoByAccountAddressMetadataParam = FromSchema<typeof schemas.GetTrc20TransactionInfoByAccountAddress.metadata>;
export type GetTrc20TransactionInfoByAccountAddressResponse200 = FromSchema<typeof schemas.GetTrc20TransactionInfoByAccountAddress.response['200']>;
export type GetTrc20TransactionInfoByAccountAddressResponse400 = FromSchema<typeof schemas.GetTrc20TransactionInfoByAccountAddress.response['400']>;
export type ListAllAssetsTrc10TokensOnChainMetadataParam = FromSchema<typeof schemas.ListAllAssetsTrc10TokensOnChain.metadata>;
export type ListAllAssetsTrc10TokensOnChainResponse200 = FromSchema<typeof schemas.ListAllAssetsTrc10TokensOnChain.response['200']>;
export type ListAllAssetsTrc10TokensOnChainResponse400 = FromSchema<typeof schemas.ListAllAssetsTrc10TokensOnChain.response['400']>;