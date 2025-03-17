import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StockData } from './StockData';
import FontUtils from '../../utils/FontUtils';

const StockItem = ({ stock }: { stock: StockData }) => {
  // 判斷價格變動顏色的工具函數
  const getPriceChangeColor = (value: string, reference: string) => {
    const numValue = parseFloat(value);
    const numReference = parseFloat(reference);

    if (numValue > numReference) {return '#FF5252';}  // 高於參考價為紅色
    if (numValue < numReference) {return '#4CAF50';}  // 低於參考價為綠色
    return '#FFFFFF';  // 等於參考價為白色
  };

  return (
    <TouchableOpacity style={styles.stockItem}>
      <View style={styles.container}>
        {/* 左側區塊：股票名稱和代號 */}
        <View style={styles.leftSection}>
          <Text style={[
            styles.name,
            { fontSize: FontUtils.calculateStockNameFontSize(stock.name) }
          ]}>
            {stock.name}
          </Text>
          <Text style={styles.symbol}>{stock.symbol}</Text>
        </View>

        {/* 收盤價區塊 */}
        <View style={styles.priceSection}>
          <Text style={[
            styles.closePrice,
            { color: getPriceChangeColor(stock.price, stock.open) },
          ]}>
            {stock.price}
          </Text>
        </View>

        {/* 漲跌區塊 */}
        <View style={styles.changeSection}>
          <Text style={[
            styles.change,
            { color: getPriceChangeColor(stock.price, stock.reference) },
          ]}>
            {stock.change}
          </Text>
          <Text style={[
            styles.changePercent,
            { color: getPriceChangeColor(stock.price, stock.reference) },
          ]}>
            {stock.changePercent}%
          </Text>
        </View>

        {/* 開盤和參考價區塊 */}
        <View style={styles.infoSection}>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>開盤：</Text>
            <Text style={[
              styles.value,
              { color: getPriceChangeColor(stock.open, stock.reference) },
            ]}>
              {stock.open}
            </Text>
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
            <Text style={[
              styles.value,
              { color: getPriceChangeColor(stock.high, stock.reference) },
            ]}>
              {stock.high}
            </Text>
          </Text>
          <Text style={styles.infoRow}>
            <Text style={styles.label}>最低：</Text>
            <Text style={[
              styles.value,
              { color: getPriceChangeColor(stock.low, stock.reference) },
            ]}>
              {stock.low}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stockItem: {
    padding: 12,
    backgroundColor: '#1E1E1E',  // 深色背景
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333333',      // 深色邊框
    margin: 6,  // 從 4 增加到 6
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftSection: {
    flex:2,
    height: 44,  // 固定高度為名稱和代號的總高度
  },
  name: {
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 24,
  },
  symbol: {
    fontSize: 14,
    color: '#AAAAAA',           // 淺灰色文字
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
    color: '#FFFFFF',           // 白色文字
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
    color: '#AAAAAA',          // 淺灰色文字
  },
  value: {
    fontSize: 13,
    color: '#FFFFFF',          // 白色文字
    marginLeft: 4,
  },
});

export default StockItem;
