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
import StockTypeFilter, { StockType, getStockType } from '../../components/StockTypeFilter';

const StockList = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedType, setSelectedType] = useState<StockType>('全部');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStockData();
  }, []);

  const loadStockData = async () => {
    const data = await stockService.fetchStockData();
    setStocks(data);
    setLoading(false);
  };

  const filteredStocks = React.useMemo(() => {
    if (selectedType === '全部') {return stocks;}
    return stocks.filter(stock => getStockType(stock.symbol) === selectedType);
  }, [stocks, selectedType]);

  return (
    <SafeAreaView style={styles.container}>
      <Header 
        title="股票列表" 
        leftComponent={
          <StockTypeFilter
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        }
      />
      <View style={styles.content}>
        <FlatList
          data={filteredStocks}
          renderItem={({ item }) => <StockItem stock={item} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          refreshing={loading}
          onRefresh={loadStockData}
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
  content: {
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#333333',
  },
});

export default StockList;
