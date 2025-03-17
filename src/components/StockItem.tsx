import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

type StockItemProps = {
  symbol: string;
  name: string;
  price: string;
  change: string;
};

const StockItem = ({ symbol, name, price, change }: StockItemProps) => (
  <TouchableOpacity style={styles.container}>
    <View style={styles.card}>
      <View style={styles.stockInfo}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.price}>${price}</Text>
        <Text style={[
          styles.change,
          { color: change.startsWith('+') ? '#4CAF50' : '#FF5252' }
        ]}>
          {change}%
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  stockInfo: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  name: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  priceInfo: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  change: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default StockItem; 