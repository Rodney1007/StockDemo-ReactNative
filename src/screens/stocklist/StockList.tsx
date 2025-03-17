import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import StockItem from './StockItem';
import { StockData } from './StockData';
import Header from '../../components/Header';
import stockService from '../../services/StockService';
import StockTypeFilter, { StockType, getStockType } from '../../components/StockTypeFilter';

const StockList = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedType, setSelectedType] = useState<StockType>('個股');
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const loadStockData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await stockService.fetchStockData();
      setStocks(data);
    } catch (error) {
      console.error('Error loading stock data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStockData();
  }, [loadStockData]);

  const filteredStocks = useMemo(() => {
    let filtered = stocks.filter(stock => 
      getStockType(stock.symbol) === selectedType
    );

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(stock => 
        stock.symbol.toLowerCase().includes(query) || 
        stock.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [stocks, selectedType, searchQuery]);

  const handleSearchChange = (text: string) => {
    if (!isSearching) {
      setIsSearching(true);
    }
    setSearchQuery(text);
  };

  const handleSearchCancel = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="股票列表"
        rightComponent={
          <StockTypeFilter
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
          />
        }
        isSearching={isSearching}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchCancel={handleSearchCancel}
      />
      <View style={styles.content}>
        <FlatList
          data={filteredStocks}
          renderItem={({ item }) => <StockItem stock={item} />}
          keyExtractor={item => item.id}
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
});

export default StockList;
