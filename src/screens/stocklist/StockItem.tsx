import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { StockData } from './StockData';

const StockItem = ({ stock }: { stock: StockData }) => {
  return (
    <TouchableOpacity style={styles.stockItem}>
      {/* 第一行：股票代號、股票名稱 */}
      <View style={styles.firstRow}>
        <Text style={styles.symbol}>{stock.symbol}</Text>
        <Text style={styles.name}>{stock.name}</Text>
      </View>

      {/* 第二行：開盤價、收盤價 */}
      <View style={styles.row}>
        <View style={styles.priceItem}>
          <Text style={styles.label}>開盤</Text>
          <Text style={styles.price}>{stock.open}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.label}>收盤</Text>
          <Text style={styles.price}>{stock.price}</Text>
        </View>
      </View>

      {/* 第三行：最高價、最低價 */}
      <View style={styles.row}>
        <View style={styles.priceItem}>
          <Text style={styles.label}>最高</Text>
          <Text style={styles.price}>{stock.high}</Text>
        </View>
        <View style={styles.priceItem}>
          <Text style={styles.label}>最低</Text>
          <Text style={styles.price}>{stock.low}</Text>
        </View>
      </View>

      {/* 第四行：漲跌價差、漲跌價差百分比 */}
      <View style={styles.row}>
        <View style={styles.changeInfo}>
          <Text style={styles.label}>漲跌價差</Text>
          <Text style={[
            styles.change,
            { color: stock.change.startsWith('+') ? '#4CAF50' : '#FF5252' }
          ]}>
            {stock.change}
          </Text>
        </View>
        <View style={styles.changeInfo}>
          <Text style={styles.label}>漲跌百分比</Text>
          <Text style={[
            styles.change,
            { color: stock.change.startsWith('+') ? '#4CAF50' : '#FF5252' }
          ]}>
            {stock.changePercent}%
          </Text>
        </View>
      </View>

      {/* 第五行：成交筆數、成交股數、成交金額 */}
      <View style={styles.row}>
        <View style={styles.tradeItem}>
          <Text style={styles.label}>成交筆數</Text>
          <Text style={styles.tradeValue}>{stock.transactions}</Text>
        </View>
        <View style={styles.tradeItem}>
          <Text style={styles.label}>成交股數</Text>
          <Text style={styles.tradeValue}>{stock.tradeVolume}</Text>
        </View>
        <View style={styles.tradeItem}>
          <Text style={styles.label}>成交金額</Text>
          <Text style={styles.tradeValue}>{stock.tradeValue}</Text>
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
    borderColor: '#E0E0E0',
    margin: 8,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    color: '#333333',
  },
  priceItem: {
    alignItems: 'center',
    minWidth: '30%',
  },
  changeInfo: {
    alignItems: 'center',
    minWidth: '30%',
  },
  tradeItem: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#333333',
  },
  change: {
    fontSize: 14,
    fontWeight: '500',
  },
  tradeValue: {
    fontSize: 14,
    color: '#333333',
  },
});

export default StockItem;