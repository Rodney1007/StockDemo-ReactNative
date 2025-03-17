export class TaiwanStockExchangeAPI {
  private static readonly BASE_URL = 'https://openapi.twse.com.tw/v1/exchangeReport';
  public static readonly DAILY_TRADING = `${this.BASE_URL}/STOCK_DAY_ALL`;
  public static readonly MARKET_METRICS = `${this.BASE_URL}/BWIBBU_ALL`;
  public static readonly MONTHLY_AVERAGE = `${this.BASE_URL}/STOCK_DAY_AVG_ALL`;
}

export default TaiwanStockExchangeAPI;
