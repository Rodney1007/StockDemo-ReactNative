import { StockData } from '../screens/stocklist/StockData';
import TaiwanStockExchangeAPI from './TaiwanStockExchangeAPI';

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

interface TWStockMetrics {
  Code: string;
  Name: string;
  PER: string;      // 本益比
  DividendYield: string;  // 殖利率
  PBR: string;      // 股價淨值比
}

interface TWStockAverage {
  Code: string;
  Name: string;
  MonthlyAvgPrice: string;  // 月均價
}

export class StockService {
  private async fetchStockPrices(): Promise<TWStockData[]> {
    try {
      const response = await fetch(TaiwanStockExchangeAPI.DAILY_TRADING);
      return await response.json();
    } catch (error) {
      console.error('Error fetching stock prices:', error);
      return [];
    }
  }

  private async fetchStockMetrics(): Promise<TWStockMetrics[]> {
    try {
      const response = await fetch(TaiwanStockExchangeAPI.MARKET_METRICS);
      return await response.json();
    } catch (error) {
      console.error('Error fetching stock metrics:', error);
      return [];
    }
  }

  private async fetchMonthlyAverages(): Promise<TWStockAverage[]> {
    try {
      const response = await fetch(TaiwanStockExchangeAPI.MONTHLY_AVERAGE);
      return await response.json();
    } catch (error) {
      console.error('Error fetching monthly averages:', error);
      return [];
    }
  }

  public async fetchStockData(): Promise<StockData[]> {
    try {
      const [priceData, metricsData, averageData] = await Promise.all([
        this.fetchStockPrices(),
        this.fetchStockMetrics(),
        this.fetchMonthlyAverages(),
      ]);

      const metricsMap = new Map(
        metricsData.map(item => [item.Code, item])
      );

      const averageMap = new Map(
        averageData.map(item => [item.Code, item])
      );

      return priceData.map((stock, index): StockData => {
        const metrics = metricsMap.get(stock.Code);
        const average = averageMap.get(stock.Code);
        const previousClose = (parseFloat(stock.ClosingPrice) - parseFloat(stock.Change)).toString();

        return {
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
          previousClose,
          marketCap: '0',
          pe: metrics?.PER ?? '-',
          pbr: metrics?.PBR ?? '-',
          dividendYield: metrics?.DividendYield ?? '-',
          tradeVolume: stock.TradeVolume,
          tradeValue: stock.TradeValue,
          transactions: stock.Transaction,
          reference: previousClose,
          monthlyAverage: average?.MonthlyAvgPrice ?? '-',
        };
      });
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return [];
    }
  }
}

export default new StockService();
