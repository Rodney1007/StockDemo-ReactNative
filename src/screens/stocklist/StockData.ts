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
        transactions: '38,423',
        reference: '578.5'
    },
    {
        id: '2',
        symbol: '2308',
        name: '台達電子',
        price: '288',
        change: '-3.0',
        changePercent: '1.03',
        volume: '800000',
        high: '292',
        low: '287',
        open: '291',
        previousClose: '291',
        marketCap: '746000000000',
        pe: '15.2',
        eps: '18.95',
        tradeVolume: '12,456,789',
        tradeValue: '3,587,456,230',
        transactions: '15,678',
        reference: '291'
    },
    {
        id: '3',
        symbol: '3008',
        name: '大立光',
        price: '2435',
        change: '+15',
        changePercent: '0.62',
        volume: '150000',
        high: '2440',
        low: '2420',
        open: '2425',
        previousClose: '2420',
        marketCap: '326000000000',
        pe: '18.6',
        eps: '130.91',
        tradeVolume: '856,234',
        tradeValue: '2,084,929,590',
        transactions: '5,234',
        reference: '2420'
    },
    {
        id: '4',
        symbol: '2412',
        name: '中華電',
        price: '92.5',
        change: '-0.5',
        changePercent: '0.54',
        volume: '450000',
        high: '93.0',
        low: '92.3',
        open: '93.0',
        previousClose: '93.0',
        marketCap: '717000000000',
        pe: '19.8',
        eps: '4.67',
        tradeVolume: '15,234,567',
        tradeValue: '1,409,197,447',
        transactions: '8,765',
        reference: '93.0'
    },
    {
        id: '5',
        symbol: '2881',
        name: '富邦金',
        price: '75.6',
        change: '+1.2',
        changePercent: '1.61',
        volume: '650000',
        high: '75.8',
        low: '74.5',
        open: '74.6',
        previousClose: '74.4',
        marketCap: '968000000000',
        pe: '11.2',
        eps: '6.75',
        tradeVolume: '18,765,432',
        tradeValue: '1,418,666,659',
        transactions: '12,345',
        reference: '74.4'
    },
    {
        id: '6',
        symbol: '2603',
        name: '長榮海運',
        price: '178',
        change: '+3.5',
        changePercent: '2.01',
        volume: '950000',
        high: '179',
        low: '175',
        open: '175.5',
        previousClose: '174.5',
        marketCap: '936000000000',
        pe: '2.1',
        eps: '84.76',
        tradeVolume: '22,345,678',
        tradeValue: '3,977,530,684',
        transactions: '25,678',
        reference: '174.5'
    },
    {
        id: '7',
        symbol: '3711',
        name: '日月光投控',
        price: '1235',
        change: '-25',
        changePercent: '1.98',
        volume: '350000',
        high: '1260',
        low: '1230',
        open: '1255',
        previousClose: '1260',
        marketCap: '528000000000',
        pe: '14.3',
        eps: '86.36',
        tradeVolume: '8,234,567',
        tradeValue: '10,169,690,245',
        transactions: '18,234',
        reference: '1260'
    },
    {
        id: '8',
        symbol: '2454',
        name: '聯發科',
        price: '838',
        change: '+18',
        changePercent: '2.19',
        volume: '550000',
        high: '840',
        low: '822',
        open: '823',
        previousClose: '820',
        marketCap: '1330000000000',
        pe: '17.8',
        eps: '47.08',
        tradeVolume: '16,234,567',
        tradeValue: '13,604,567,346',
        transactions: '22,345',
        reference: '820'
    },
    {
        id: '9',
        symbol: '2382',
        name: '廣達',
        price: '88.5',
        change: '-1.5',
        changePercent: '1.67',
        volume: '480000',
        high: '90.0',
        low: '88.3',
        open: '89.8',
        previousClose: '90.0',
        marketCap: '341000000000',
        pe: '11.5',
        eps: '7.70',
        tradeVolume: '11,234,567',
        tradeValue: '994,259,178',
        transactions: '9,876',
        reference: '90.0'
    },
    {
        id: '10',
        symbol: '2892',
        name: '第一金',
        price: '26.85',
        change: '+0.35',
        changePercent: '1.32',
        volume: '720000',
        high: '26.90',
        low: '26.55',
        open: '26.60',
        previousClose: '26.50',
        marketCap: '324000000000',
        pe: '12.4',
        eps: '2.17',
        tradeVolume: '19,876,543',
        tradeValue: '533,684,929',
        transactions: '11,234',
        reference: '26.50'
    }
];
