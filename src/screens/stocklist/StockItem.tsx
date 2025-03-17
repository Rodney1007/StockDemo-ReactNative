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

  // 修改交易量格式化函數，返回格式化後的文字和是否為股的標記
  const formatVolume = (volume: string): { text: string; isShares: boolean } => {
    const numVolume = parseInt(volume, 10);
    if (isNaN(numVolume)) return { text: '-', isShares: false };

    if (numVolume < 1000) {
      return { text: `${numVolume}股`, isShares: true };
    }
    return { text: `${Math.floor(numVolume / 1000).toLocaleString()}張`, isShares: false };
  };

  // 在渲染時使用格式化結果
  const volumeInfo = formatVolume(stock.tradeVolume);

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

        {/* 合併的資訊區塊 */}
        <View style={styles.gridSection}>
          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>開盤：</Text>
              <Text style={[
                styles.value,
                { color: getPriceChangeColor(stock.open, stock.reference) },
              ]}>
                {stock.open}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>最高：</Text>
              <Text style={[
                styles.value,
                { color: getPriceChangeColor(stock.high, stock.reference) },
              ]}>
                {stock.high}
              </Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>參考：</Text>
              <Text style={styles.value}>{stock.reference}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>最低：</Text>
              <Text style={[
                styles.value,
                { color: getPriceChangeColor(stock.low, stock.reference) },
              ]}>
                {stock.low}
              </Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={[styles.gridItem, styles.volumeItem]}>
              <Text style={styles.label}>交易量：</Text>
              <Text style={[
                styles.value,
                styles.volumeValue,
                volumeInfo.isShares && styles.shareVolume
              ]}>
                {volumeInfo.text}
              </Text>
            </View>
          </View>
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
  gridSection: {
    flex: 3.5,
    marginLeft: 8,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  gridItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  volumeItem: {
    flex: 2,
    justifyContent: 'space-between',  // 讓標籤和數值分開對齊
  },
  volumeValue: {
    textAlign: 'right',
    flex: 1,
    color: '#FFFFFF',
    marginEnd:6,
  },
  shareVolume: {
    color: '#888888',  // 當以股為單位時使用灰色
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
