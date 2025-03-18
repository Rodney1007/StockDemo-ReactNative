import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import StockItem from '../components/StockItem.tsx';
import { StockData } from '../components/StockData.ts';
import Header from '../components/Header.tsx';
import stockService from '../services/StockService.ts';
import StockTypeFilter, { StockType, getStockType } from '../components/StockTypeFilter.tsx';
import AddToWatchListDialog from '../components/AddToWatchListDialog.tsx';

const StockList = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [selectedType, setSelectedType] = useState<StockType>('個股');
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [showDialog, setShowDialog] = useState(false);

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
    loadStockData().finally();
  }, [loadStockData]);

  const filteredStocks = useMemo(() => {
    return stocks.filter(stock => getStockType(stock.symbol) === selectedType);
  }, [stocks, selectedType]);

  const handleStockPress = useCallback((symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
      setShowDialog(true);
    }
  }, [stocks]);

  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedStock(null);
  };

  const handleAddSuccess = async () => {
    await loadStockData();
    handleDialogClose();
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
      />
      <View style={styles.content}>
        <FlatList
          data={filteredStocks}
          renderItem={({ item }) => (
            <StockItem
              stock={item}
              onPress={handleStockPress}
            />
          )}
          keyExtractor={item => item.id}
          refreshing={loading}
          onRefresh={loadStockData}
        />
      </View>

      {selectedStock && (
        <AddToWatchListDialog
          visible={showDialog}
          stock={selectedStock}
          onSuccess={handleAddSuccess}
          onClose={handleDialogClose}
        />
      )}
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
    paddingTop: 16,
  },
});

export default StockList;
