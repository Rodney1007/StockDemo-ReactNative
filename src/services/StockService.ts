import { StockData } from '../screens/stocklist/StockData';

interface TWStockData {
  Code: string;
  Name: string;
  TradeVolume: string;
  TradeValue: string;
  OpeningPrice: string;
  HighestPrice: string;
  LowestPrice: string;
  ClosingPrice: string;
  Change: string;
  Transaction: string;
}

export class StockService {
  public async fetchStockData(): Promise<StockData[]> {
    try {
      const response = await fetch('https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL');
      const data: TWStockData[] = await response.json();

      return data.map((stock, index) => ({
        id: index.toString(),
        symbol: stock.Code,
        name: stock.Name,
        price: stock.ClosingPrice,
        change: stock.Change,
        changePercent: ((parseFloat(stock.Change) / parseFloat(stock.ClosingPrice)) * 100).toFixed(2),
        volume: stock.TradeVolume,
        high: stock.HighestPrice,
        low: stock.LowestPrice,
        open: stock.OpeningPrice,
        previousClose: (parseFloat(stock.ClosingPrice) - parseFloat(stock.Change)).toString(),
        marketCap: '0',  // API 未提供
        pe: '0',         // API 未提供
        eps: '0',        // API 未提供
        tradeVolume: stock.TradeVolume,
        tradeValue: stock.TradeValue,
        transactions: stock.Transaction,
        reference: (parseFloat(stock.ClosingPrice) - parseFloat(stock.Change)).toString(),
      }));
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return [];
    }
  }
}

export default new StockService();
