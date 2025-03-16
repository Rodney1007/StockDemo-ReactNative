import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// 模擬股票數據
const stockData = [
  {id: '1', symbol: '2330', name: '台積電', price: '580', change: '+2.5'},
  {id: '2', symbol: '2317', name: '鴻海', price: '105', change: '-0.8'},
  {id: '3', symbol: '2454', name: '聯發科', price: '820', change: '+1.2'},
  // 可以添加更多股票數據
];

type StockItem = {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
};



const StockList = () => {

  const renderStockItem = ({item}: {item: StockItem}) => (
    <TouchableOpacity style={styles.stockItem}>
      <View style={styles.stockInfo}>
        <Text style={styles.stockSymbol}>{item.symbol}</Text>
        <Text style={styles.stockName}>{item.name}</Text>
      </View>
      <View style={styles.priceInfo}>
        <Text style={styles.stockPrice}>${item.price}</Text>
        <Text
          style={[
            styles.priceChange,
            {color: item.change.startsWith('+') ? '#4CAF50' : '#FF5252'},
          ]}>
          {item.change}%
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 頂部列 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          // onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>股票列表</Text>
      </View>

      {/* 內容區域 */}
      <View style={styles.content}>
        <FlatList
          data={stockData}
          renderItem={renderStockItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
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
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});

export default StockList;
