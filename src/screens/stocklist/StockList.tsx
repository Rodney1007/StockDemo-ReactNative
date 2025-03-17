import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import StockItem from './StockItem';
import { StockData } from './StockData';
import Header from '../../components/Header';
import stockService from '../../services/StockService';

const StockList = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStockData = async () => {
      const data = await stockService.fetchStockData();
      setStocks(data);
      setLoading(false);
    };

    loadStockData();
  }, []);

  const renderStockItem = ({ item }: { item: StockData }) => (
    <StockItem stock={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="股票列表" />
      <View style={styles.content}>
        <FlatList
          data={stocks}
          renderItem={renderStockItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshing={loading}
          onRefresh={() => {
            setLoading(true);
            stockService.fetchStockData().then(data => {
              setStocks(data);
              setLoading(false);
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  headerGlow: {
    height: 1,
    backgroundColor: '#333333',
    shadowColor: '#FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  separator: {
    height: 0,
  },
});

export default StockList;
