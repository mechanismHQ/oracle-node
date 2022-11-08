import { fetchPriceAMM } from "./amm";
import { PriceSourceInterface } from "./interface";

export class SourceCoinGecko implements PriceSourceInterface {

  // Return price as int (with given decimals)
  public async fetchPrice(symbol: string, decimals: number): Promise<number> {
    const price = await this.fetchPriceHelper(symbol, decimals);
    return Math.round(price * decimals);
  }

  // Return price as double
  async fetchPriceHelper(symbol: string, decimals: number): Promise<number> {
    // API
    if (symbol == "STX") {
      return await this.fetchPriceAPI("blockstack", decimals);
    } else if (symbol == "BTC") {
      return await this.fetchPriceAPI("bitcoin", decimals);
    }

    // AMM
    const stxPrice = await this.fetchPriceAPI("blockstack", decimals);
    return await fetchPriceAMM(symbol, stxPrice);
  }

  async fetchPriceAPI(id: string, decimals: number): Promise<number> {
    const precision = `${decimals}`.split("0").length - 1;
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&precision=${precision}`;
    const response = await fetch(url, { credentials: 'omit' });
    const data = await response.json();
    return data[id].usd;
  }
}
