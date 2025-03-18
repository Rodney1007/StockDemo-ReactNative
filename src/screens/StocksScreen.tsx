import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StyleSheet, FlatList, SafeAreaView, RefreshControl} from 'react-native';
import StockItem from '../components/StockItem';
import {StockData} from '../components/StockData';
import Header from '../components/Header';
import stockService from '../services/StockService';
import StockTypeFilter, {
  StockType,
  getStockType,
} from '../components/StockTypeFilter';
import AddToWatchListDialog from '../components/AddToWatchListDialog';
import Colors from '../constants/Colors';

const StocksScreen = () => {
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

  const handleStockPress = useCallback(
    (symbol: string) => {
      const stock = stocks.find(s => s.symbol === symbol);
      if (stock) {
        setSelectedStock(stock);
        setShowDialog(true);
      }
    },
    [stocks],
  );

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
      <FlatList
        data={filteredStocks}
        renderItem={({item}) => (
          <StockItem stock={item} onPress={handleStockPress} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={loadStockData}
            tintColor={Colors.text.primary}
          />
        }
      />
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
    backgroundColor: Colors.background.primary,
  },
  listContent: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
});

export default StocksScreen;
