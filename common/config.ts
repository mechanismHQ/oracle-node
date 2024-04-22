import dotenv from 'dotenv';
dotenv.config();

import { cheetah } from '@nieldeckx/stacks-cheetah';
import { SourceCoinbase } from '@sources/coinbase';
import { SourceCoinCap } from '@sources/coincap';
import { SourceCoinGecko } from '@sources/coingecko';
import { SourceCoinMarketCap } from '@sources/coinmarketcap';
import { SourceCryptoCompare } from '@sources/cryptocompare';
import { SourceKucoin } from '@sources/kucoin';
import { StacksMainnet, StacksMocknet, StacksTestnet } from "@stacks/network";

const network = process.env.NEXT_PUBLIC_NETWORK as 'mocknet' | 'testnet' | 'mainnet';
const source = process.env.NEXT_PUBLIC_SOURCE as 'coinmarketcap' | 'coingecko' | 'coinbase' | 'kucoin' | 'coincap' | 'cryptocompare';

// Map source names to objects
function getSource() {
  if (source == "coingecko") {
    return new SourceCoinGecko();
  } else if (source == "coinbase") {
    return new SourceCoinbase();
  } else if (source == "kucoin") {
    return new SourceKucoin();
  } else if (source == "coincap") {
    return new SourceCoinCap();
  } else if (source == "cryptocompare") {
    return new SourceCryptoCompare();
  }
  return new SourceCoinMarketCap();
}

// Token info
export const tokenInfo: { [key: string]: { decimals: number, arkadikoDecimals: number, tooltip?: string } } = {
  "STX": { decimals: 6, arkadikoDecimals: 1000000 },
  "BTC": { decimals: 6, arkadikoDecimals: 100000000 },
  "DIKO": { decimals: 6, arkadikoDecimals: 1000000 },
  "USDA": { decimals: 6, arkadikoDecimals: 1000000, tooltip: "Using ALEX xUSD/USDA stable pool" },
  "STX/USDA": { decimals: 6, arkadikoDecimals: 1000000, tooltip: "Using STX/USDA Arkadiko swap pool" },
  "auto-alex": { decimals: 8, arkadikoDecimals: 10000000000 },
  "auto-alex-v2": { decimals: 8, arkadikoDecimals: 10000000000 },
  "stSTX": { decimals: 6, arkadikoDecimals: 1000000 },
}

// Mocknet config
const mocknet = {
  symbols: ["STX", "BTC", "USDA", "STX/USDA", "DIKO", "auto-alex", "auto-alex-v2", "stSTX"],
  nodes: [
    "https://coinmarketcap-oracle-285608c255ed.herokuapp.com",
    "https://coingecko-oracle-ca7823d12278.herokuapp.com",
    "https://cryptocompare-oracle-f12596bbddc4.herokuapp.com"
  ],
  signKey: process.env.SIGN_KEY as string,
  networkName: network,
  network: new StacksMocknet(),
  stacksApiBase: "https://devnet.stackonmybrotha.xyz",
  oracleAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  oracleContractName: "arkadiko-oracle-v2-3",
  arkadikoAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  alexAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  managerAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  managerKey: "753b7cc01a1a2e86221266a154af739463fce51219d97e4f856cd7200c3bd2a601",
  source: getSource(),
  sourceName: source,
  inputMaxBlockDiff: 3,
  inputMaxPriceDiff: 0.025,
  updateBlockDiff: 6,
  updatePriceDiff: 0.1
};

// Testnet config
const testnet = {
  symbols: ["STX", "BTC", "USDA", "STX/USDA", "DIKO", "auto-alex", "auto-alex-v2", "stSTX"],
  nodes: [
    "http://localhost:3000/api/sign",
    "http://localhost:3000/api/sign",
    "http://localhost:3000/api/sign"
  ],
  signKey: process.env.SIGN_KEY as string,
  networkName: network,
  network: new StacksTestnet(),
  stacksApiBase: "https://stacks-node-api.testnet.stacks.co",
  oracleAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  oracleContractName: "arkadiko-oracle-v2-3",
  arkadikoAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  alexAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  managerAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
  managerKey: process.env.STACKS_KEY as string,
  source: getSource(),
  sourceName: source,
  inputMaxBlockDiff: 3,
  inputMaxPriceDiff: 0.025,
  updateBlockDiff: 6,
  updatePriceDiff: 0.1
}

// Mainnet config
const mainnet = {
  // symbols: ["STX", "BTC", "USDA", "STX/USDA", "DIKO", "auto-alex", "auto-alex-v2", "stSTX"],
  symbols: ["STX", "BTC", "stSTX"],
  nodes: [
    "https://oracle-node-cmc-93cae714f6ee.herokuapp.com",
    "https://oracle-node-coinbase-0ce3a6b4f2bd.herokuapp.com",
    "https://oracle-node-coincap-608f068d5a76.herokuapp.com",
    "https://oracle-node-cryptocompare-05ea46921e27.herokuapp.com",
    "https://oracle-node-coingecko-759ba1fb518b.herokuapp.com",
  ],
  signKey: process.env.SIGN_KEY as string,
  networkName: network,
  network: new StacksMainnet({ url: "https://burned-cosmological-meadow.stacks-mainnet.quiknode.pro/d7c6a3bf73c0f2578c71cf6e6ddf0b96cf2f4aa9" }),
  stacksApiBase: "https://burned-cosmological-meadow.stacks-mainnet.quiknode.pro/d7c6a3bf73c0f2578c71cf6e6ddf0b96cf2f4aa9",
  oracleAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
  oracleContractName: "arkadiko-oracle-v2-3",
  arkadikoAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
  alexAddress: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9",
  managerAddress: "SP3K198T4PSVAPJT5K3060HXWEDVMKGA2S4TB0K9C",
  managerKey: process.env.STACKS_KEY as string,
  source: getSource(),
  sourceName: source,
  inputMaxBlockDiff: 3,
  inputMaxPriceDiff: 0.025,
  updateBlockDiff: 6,
  updatePriceDiff: 0.1
}

const networks = {
  mocknet,
  testnet,
  mainnet
}

export const config = networks[network];

cheetah.setup({
  network: process.env.NEXT_PUBLIC_NETWORK as 'mainnet' | 'testnet',
  coreApiUrl: networks[network].stacksApiBase,
})
