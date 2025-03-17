import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StockItem from '../components/StockItem';

// 模擬股票數據
const stockData = [
  { id: '1', symbol: '2330', name: '台積電', price: '580', change: '+2.5' },
  { id: '2', symbol: '2317', name: '鴻海', price: '105', change: '-0.8' },
  { id: '3', symbol: '2454', name: '聯發科', price: '820', change: '+1.2' },
  // 可以添加更多股票數據
];

type StockData = {
  id: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
};

const StockList = () => {

  const renderStockItem = ({ item }: { item: StockData }) => (
    <StockItem
      symbol={item.symbol}
      name={item.name}
      price={item.price}
      change={item.change}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />
      {/* 頂部列 */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
        >
          <Icon name="menu" size={28} color="#333333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>股票列表</Text>
        </View>
        <View style={styles.placeholder} />
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56, // Material Design 規範的標準高度
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  menuButton: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 8,
    zIndex: 1,
  },
  headerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500', // Material Design 建議的字重
    color: '#333333',
    includeFontPadding: false,
  },
  placeholder: {
    width: 48,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 12,  // 添加頂部間距
  },
  separator: {
    height: 0,
  },
});

export default StockList;
