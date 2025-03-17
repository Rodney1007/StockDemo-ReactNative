export interface StockData {
    id: string;          // 股票 ID
    symbol: string;      // 股票代碼
    name: string;        // 股票名稱
    price: string;       // 股價
    change: string;      // 漲跌幅
    changePercent: string; // 漲跌百分比
    volume: string;      // 成交量
    high: string;        // 最高價
    low: string;         // 最低價
    open: string;        // 開盤價
    previousClose: string; // 昨收價
    marketCap: string;   // 市值
    pe: string;          // 本益比
    eps: string;         // 每股盈餘
    tradeVolume: string; // 成交股數
    tradeValue: string;  // 成交金額
    transactions: string; // 成交筆數
}

// 示例資料
export const stockData: StockData[] = [
    {
        id: '1',
        symbol: '2330',
        name: '台積電',
        price: '580',
        change: '+2.5',
        changePercent: '0.43',
        volume: '1000000',
        high: '582',
        low: '578',
        open: '579',
        previousClose: '577.5',
        marketCap: '15000000000000',
        pe: '16.5',
        eps: '35.15',
        tradeVolume: '25,369,421',
        tradeValue: '14,714,264,180',
        transactions: '38,423'
    },
    // ... 可以添加更多股票資料
];
