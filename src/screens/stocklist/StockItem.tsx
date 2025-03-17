import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StockData } from './StockData';

const StockItem = ({ stock }: { stock: StockData }) => {
  // 處理漲跌幅的正負號
  const changePercentWithSign = stock.change.startsWith('+')
    ? `+${stock.changePercent}`
    : `-${stock.changePercent}`;

  return (
    <TouchableOpacity style={styles.stockItem}>
      <View style={styles.container}>
        {/* 左側區塊：股票名稱和代號 */}
        <View style={styles.leftSection}>
          <Text style={styles.name}>{stock.name}</Text>
          <Text style={styles.symbol}>{stock.symbol}</Text>
        </View>

        {/* 收盤價區塊 */}
        <View style={styles.priceSection}>
          <Text style={styles.closePrice}>{stock.price}</Text>
        </View>

        {/* 漲跌區塊 */}
        <View style={styles.changeSection}>
          <Text style={[
            styles.change,
            { color: stock.change.startsWith('+') ? '#4CAF50' : '#FF5252' }
          ]}>
            {stock.change}
          </Text>
          <Text style={[
            styles.changePercent,
            { color: stock.change.startsWith('+') ? '#4CAF50' : '#FF5252' }
          ]}>
            {changePercentWithSign}%
          </Text>
        </View>

        {/* 開盤和參考價區塊 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>開盤：</Text>
            <Text style={styles.value}>{stock.open}</Text>
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>參考：</Text>
            <Text style={styles.value}>{stock.reference}</Text>
          </Text>
        </View>

        {/* 最高和最低價區塊 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>最高：</Text>
            <Text style={styles.value}>{stock.high}</Text>
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>最低：</Text>
            <Text style={styles.value}>{stock.low}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stockItem: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    margin: 8,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex: 1.8,
    height: 44,  // 固定高度為名稱和代號的總高度
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 24,
  },
  symbol: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 16,
  },
  priceSection: {
    flex: 1.5,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  closePrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'right',
  },
  changeSection: {
    flex: 1.1,
    alignItems: 'flex-end',
  },
  change: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  changePercent: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoSection: {
    flex: 1.5,
    marginLeft: 8,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: '#666666',
  },
  value: {
    fontSize: 13,
    color: '#333333',
    marginLeft: 4,
  },
});

export default StockItem;
