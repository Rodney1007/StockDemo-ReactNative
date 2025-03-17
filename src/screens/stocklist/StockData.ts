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
    reference: string;  // 參考價
}

// 示例資料
