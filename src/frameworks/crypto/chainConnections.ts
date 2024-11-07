export enum ChainEnum {
  ETH = 'ETH',
  BNB = 'BNB',
  POL = 'POL',
  TRX = 'TRX',
}

export const ChainContract = {
  '0x1': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  '0x38': '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  '0x89': '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
}; //MAYBE COINGECKO! this for rate restrictions

export const ChainName = {
  '0x1': ChainEnum.ETH,
  '0x38': ChainEnum.BNB,
  '0x89': ChainEnum.POL,
};
