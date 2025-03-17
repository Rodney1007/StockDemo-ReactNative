import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface StockItemProps {
  symbol: string;
  name: string;
  price: string;
  change: string;
}

const StockItem = ({ symbol, name, price, change }: StockItemProps) => {
  return (
    <TouchableOpacity style={styles.stockItem}>
      <View style={styles.stockInfo}>
        <Text style={styles.stockSymbol}>{symbol}</Text>
        <Text style={styles.stockName}>{name}</Text>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.stockPrice}>${price}</Text>
        <Text style={[
          styles.priceChange,
          { color: change.startsWith('+') ? '#4CAF50' : '#FF5252' }
        ]}>
          {change}%
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockName: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default StockItem; 